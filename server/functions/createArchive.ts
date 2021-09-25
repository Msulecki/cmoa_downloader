import fs from 'fs';
import tar from 'tar';
import { defaultConfig } from '../config/config.js';

const createArchive = (filename: string): Promise<void> => {
  const imgPath = defaultConfig.finalFilesPath;
  const destinationPath = defaultConfig.tarFilePath;

  console.log('creating archive');

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(`${destinationPath}/${filename}`);

    tar
      .c(
        {
          gzip: true,
          onwarn: reject,
        },
        [imgPath]
      )
      .pipe(stream);

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      console.log('archive created');

      resolve();
    });
  });
};

export default createArchive;
