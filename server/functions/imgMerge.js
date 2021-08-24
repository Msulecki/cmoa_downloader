import { defaultConfig } from '../config/config.js';
import imgMergeAsync from './imgMergeAsync.js';

function imgMerge(imgArr, socket) {
  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Writing files',
    progress: 63,
  });

  const promisesArr = imgArr.map((img, index) => {
    return imgMergeAsync(img, index);
  });

  return Promise.all([promisesArr]);
}

export default imgMerge;
