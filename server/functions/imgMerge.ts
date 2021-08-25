import imgMergeAsync from './imgMergeAsync.js';
import { defaultConfig } from '../config/config.js';
import { Socket } from 'socket.io';

const imgMerge = (imgArr: Array<string[]>, socket: Socket): Promise<any> => {
  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Writing files',
    progress: 63,
  });

  const promisesArr = imgArr.map((img, index) => {
    return imgMergeAsync(img, index);
  });

  return Promise.all([promisesArr]);
};

export default imgMerge;
