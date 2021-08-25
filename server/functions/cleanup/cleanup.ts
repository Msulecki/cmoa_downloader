import cleanupByPath from './cleanupByPath.js';
import { defaultConfig } from '../../config/config.js';
import { Socket } from 'socket.io';

const cleanup = (socket: Socket): Promise<void[]> => {
  const tmpPath = defaultConfig.tempFilesPath;
  const imgPath = defaultConfig.finalFilesPath;

  socket.emit(`event:progress:${defaultConfig.token}`, {
    message: 'Done, performing cleanup',
    progress: 85,
  });

  const imgCleanup = cleanupByPath({
    path: imgPath,
    message: 'Removing ### image files.',
    socket,
  });

  const tmpCleanup = cleanupByPath({
    path: imgPath,
    message: 'Removing ### temp files.',
    socket,
  });

  return Promise.all([imgCleanup]);
};

export default cleanup;
