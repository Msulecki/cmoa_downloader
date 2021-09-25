import imgMergeAsync from './imgMergeAsync.js';

const imgMerge = (imgArr: Array<string[]>): Promise<any> => {
  const promisesArr = imgArr.map((img, index) => {
    return imgMergeAsync(img, index);
  });

  return Promise.all([promisesArr]);
};

export default imgMerge;
