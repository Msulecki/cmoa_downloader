import sizeOf from 'image-size';
import { defaultConfig } from '../config/config.js';

async function getImgSize(img, index) {
  const height = await img.reduce(
    (curr, acc, i) =>
      (curr += sizeOf(
        `${defaultConfig.tempFilesPath}/img_${index + 1}-${i + 1}.png`
      ).height),
    0
  );

  return height;
}

export default getImgSize;
