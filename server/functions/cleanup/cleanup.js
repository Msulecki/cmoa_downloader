import { defaultConfig } from '../../config/config.js';
import cleanupImg from './cleanupImg.js';
import cleanupTmp from './cleanupTmp.js';

const cleanup = (socket) => {
  const tmpPath = defaultConfig.tempFilesPath;
  const imgPath = defaultConfig.finalFilesPath;

  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Done, performing cleanup',
    progress: 85,
  });

  const asyncImgCleanup = cleanupImg(imgPath, socket);
  const asyncTmpCleanup = cleanupTmp(tmpPath, socket);

  return Promise.all([asyncImgCleanup, asyncTmpCleanup]);
};

export default cleanup;
