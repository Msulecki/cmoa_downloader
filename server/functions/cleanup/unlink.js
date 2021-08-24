import path from 'path';
import fs from 'fs';

const unlink = (files, sourcePath) => {
  const promisesArr = files.map((file) => {
    return new Promise((resolve, reject) => {
      fs.unlink(path.join(sourcePath, file), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });

  return Promise.all(promisesArr);
};

export default unlink;
