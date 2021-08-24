import fs from 'fs';
import sizeOf from 'image-size';
import mergeImages from 'merge-images';
import getImgSize from './getImgSize.js';
import canvas from 'canvas';
import { defaultConfig } from '../config/config.js';

const { Canvas, Image } = canvas;

async function imgMergeAsync(img, index) {
  const imgDimFinal = await getImgSize(img, index);
  let imgOffset = 0;

  const b64 = await mergeImages(
    img.map((image, ind) => {
      const imgSrc = `${defaultConfig.tempFilesPath}/img_${index + 1}-${
        ind + 1
      }.png`;
      const prevImgSrc = `${defaultConfig.tempFilesPath}/img_${
        index + 1
      }-${ind}.png`;

      if (ind > 0) {
        imgOffset = imgOffset + sizeOf(prevImgSrc).height - 4;
      }

      return { src: imgSrc, x: 0, y: imgOffset };
    }),
    {
      Canvas: Canvas,
      Image: Image,
      height: imgDimFinal - (4 * img.length - 1),
    }
  );

  const b64Data = b64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const bufferData = Buffer.from(b64Data[2], 'base64');

  fs.writeFile(
    `${defaultConfig.finalFilesPath}/image_${index + 1}.png`,
    bufferData,
    (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
}

export default imgMergeAsync;
