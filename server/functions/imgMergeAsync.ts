import fs from 'fs';
import sizeOf from 'image-size';
import mergeImages from 'merge-images';
import canvas from 'canvas';
import getImgSize from './getImgSize.js';
import { defaultConfig } from '../config/config.js';

const { Canvas, Image } = canvas;

const SUBIMG_OFFSET = 4;

async function imgMergeAsync(
  img: Promise<Buffer>[],
  index: number
): Promise<any> {
  const imgDimFinal = await getImgSize(img);
  let imgOffset = 0;

  const resolvedImgArray = await Promise.all(img);

  const imagesMap = resolvedImgArray.map((image, ind) => {
    if (ind > 0) {
      imgOffset =
        imgOffset +
        (sizeOf(resolvedImgArray[ind - 1]).height || 0) -
        SUBIMG_OFFSET;
    }

    return { src: image, x: 0, y: imgOffset };
  });

  const b64 = await mergeImages(imagesMap, {
    Canvas: Canvas,
    Image: Image,
    height: imgDimFinal - (SUBIMG_OFFSET * img.length - 1),
  });

  const b64Data = b64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (!b64Data) {
    throw new Error('No b64 data returned from image merge action');
  }

  const bufferData = Buffer.from(b64Data[2], 'base64');

  fs.writeFile(
    `${defaultConfig.finalFilesPath}/image_${index}.png`,
    bufferData,
    (err) => {
      if (err) {
        throw new Error(err.message);
      }
      console.log('write:', index);
    }
  );
}

export default imgMergeAsync;
