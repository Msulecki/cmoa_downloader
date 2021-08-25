import fs from 'fs';
import unlink from './unlink.js';
import { defaultConfig } from '../../config/config.js';
import { Socket } from 'socket.io';

interface ICleanupByPath {
  path: string;
  message: string;
  socket: Socket;
}

const cleanupByPath = ({
  path,
  message,
  socket,
}: ICleanupByPath): Promise<void> =>
  new Promise((resolve, reject) =>
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }

      if (!files.length) {
        resolve();
      } else {
        socket.emit(`event:progress:${defaultConfig.token}`, {
          message: message.split('###').join(`${files.length}`),
          progress: 87,
        });

        unlink(files, path)
          .then(() => {
            resolve();
          })
          .catch((err) => reject(err));
      }
    })
  );

export default cleanupByPath;
