import fs from 'fs';
import { Socket } from 'socket.io';
import tar from 'tar';
import { defaultConfig } from '../config/config.js';

const createArchive = (filename: string, socket: Socket): Promise<void> => {
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
      console.log('archive created');

      resolve();
    });
  });
};

export default createArchive;
