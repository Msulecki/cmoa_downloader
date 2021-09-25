import cleanupByPath from './cleanupByPath.js';
import { defaultConfig } from '../../config/config.js';
import { Socket } from 'socket.io';

const cleanup = (socket: Socket): Promise<void[]> => {
  const imgPath = defaultConfig.finalFilesPath;

  const imgCleanup = cleanupByPath({
    path: imgPath,
    message: 'Removing ### image files.',
    socket,
  });

  return Promise.all([imgCleanup]);
};

export default cleanup;
