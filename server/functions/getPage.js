import fs from 'fs';
import puppeteer from 'puppeteer';
import { defaultConfig } from '../config/config.js';

async function getPage(socket) {
  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Opening CMOA page',
    progress: 2,
  });

  async function scrapper() {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto('https://www.cmoa.jp/auth/login/');
      await page.waitForSelector('input[type="email"]');
      await page.type('input[type="email"]', defaultConfig.login);
      await page.waitForSelector('input[type="password"]');
      await page.type('input[type="password"]', defaultConfig.password);
      await page.$eval('form', (form) => form.submit());

      page.on('error', () => {
        socket.emit(`event:error:${defaultConfig.token}`, { message: error });
      });

      page.on('pageerror', () => {
        socket.emit(`event:error:${defaultConfig.token}`, { message: error });
      });

      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Logging in...',
        progress: 5,
      });

      await page.waitForTimeout(10000);

      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Login success',
        progress: 10,
      });

      await page.goto(defaultConfig.url);

      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Loading manga url',
        progress: 12,
      });

      await page.waitForTimeout(5000);

      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Url loaded',
        progress: 15,
      });

      const slidesCounter = await page.$('#menu_slidercaption');
      const slidesText = await page.evaluate(
        (slidesCounter) => slidesCounter.textContent,
        slidesCounter
      );
      const slidesCount = await parseInt(slidesText.split('/')[1]);
      const imgArr = [];

      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: `Found ${slidesCount} slides`,
        progress: 16,
      });

      for (let i = 1; i < Math.floor(slidesCount / 2) + 1; i++) {
        await page.waitForTimeout(500);

        for (let j = 0; j < 2; j++) {
          await page.waitForTimeout(500);

          const step = i * 2 - 1 + j;
          await page.waitForSelector(`#content-p${step} img`);
          const images = await page.$$eval(
            `#content-p${step} img[src]`,
            (imgs) => imgs.map((img) => img.getAttribute('src'))
          );

          socket.emit(`event:progress:${defaultConfig.token}`, {
            message: `Getting slide: ${step}/${slidesCount}`,
            progress: 16 + Math.floor((step / slidesCount) * 40),
          });

          imgArr.push(images);

          images.forEach(async (image, k) => {
            await page.waitForTimeout(500);

            const newTab = await browser
              .newPage()
              .catch((err) => console.error('err'));
            const viewSource = await newTab.goto(image);

            fs.writeFile(
              `${defaultConfig.tempFilesPath}/img_${step}-${k + 1}.png`,
              await viewSource.buffer(),
              function (err) {
                if (err) {
                  return console.log(err);
                }
              }
            );

            await page.waitForTimeout(200);
            await newTab.close();
            await page.bringToFront();
          });
        }

        await page.waitForTimeout(500);
        await page.keyboard.press('ArrowLeft');
      }
      socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Closing connection...',
        progress: 60,
      });

      await page.waitForTimeout(3000);

      await page.waitForTimeout(3000);

      await browser.close();

      await socket.emit(`event:progress:${defaultConfig.token}`, {
        message: 'Scrapping finished',
        progress: 62,
      });

      return imgArr;
    } catch (error) {
      throw new Error(error);
    }
  }

  return scrapper();
}

export default getPage;
