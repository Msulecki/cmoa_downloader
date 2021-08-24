import fs from 'fs';
import unlink from './unlink.js';
import { defaultConfig } from '../../config/config.js';

const tmpAsync = (tmpPath, socket) =>
  new Promise((resolve, reject) =>
    fs.readdir(tmpPath, (err, files) => {
      if (err) {
        reject(err);
      }

      if (!files.length) {
        resolve();
      } else {
        socket.emit(`event:progress:${defaultConfig.token}`, {
          message: `Removing ${files.length} temp files`,
          progress: 87,
        });

        unlink(files, tmpPath)
          .then(() => {
            resolve();
          })
          .catch((err) => reject(err));
      }
    })
  );

export default tmpAsync;
