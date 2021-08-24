import fs from 'fs';
import tar from 'tar';
import { defaultConfig } from '../config/config.js';

const createArchive = (filename, socket) => {
  const imgPath = defaultConfig.finalFilesPath;
  const destinationPath = defaultConfig.tarFilePath;

  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Creating archive...',
    progress: 76,
  });

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
      resolve();
    });
  });
};

export default createArchive;
