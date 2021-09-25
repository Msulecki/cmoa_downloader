import { useEffect, useContext } from 'react';
import { SocketContext } from '../SocketConnection/SocketConnection';

const DownloadHandler = () => {
  const { socket, userToken } = useContext(SocketContext);

  useEffect(() => {
    socket.on(`event:link:${userToken}`, (data: { path: string }) => {
      console.log(`%c Download link: ${data.path}`, 'color:#66DD44;');

      const link = document.createElement('a');
      link.setAttribute('href', data.path);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      document.body.appendChild(link);
      link.click();
    });

    return () => {
      socket.off(`event:link:${userToken}`);
    };
  }, [socket, userToken]);

  return null;
};

export default DownloadHandler;
