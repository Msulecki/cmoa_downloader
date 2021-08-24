import fs from 'fs';
import unlink from './unlink.js';
import { defaultConfig } from '../../config/config.js';

const imgAsync = (imgPath, socket) =>
  new Promise((resolve, reject) =>
    fs.readdir(imgPath, (err, files) => {
      if (err) {
        reject(err);
      }

      if (!files.length) {
        resolve();
      } else {
        socket.emit(`event:progress:${defaultConfig.token}`, {
          message: `Removing ${files.length} image files`,
          progress: 91,
        });

        unlink(files, imgPath)
          .then(() => {
            resolve();
          })
          .catch((err) => reject(err));
      }
    })
  );

export default imgAsync;
