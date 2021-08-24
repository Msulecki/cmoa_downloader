import { useContext, useEffect, useState } from 'react';
import './ProgressInfo.scss';
import { SocketContext } from '../SocketConnection/SocketConnection';
import { IProgressData } from '.';

const ProgressInfo = () => {
  const { socket, userToken } = useContext(SocketContext);

  const [message, setMessage] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    socket.on(`event:start:${userToken}`, () => {
      setMessage(['Starting...']);
    });

    return () => {
      socket.off(`event:start:${userToken}`);
    };
  }, [socket, userToken]);

  useEffect(() => {
    socket.on(`event:progress:${userToken}`, (data: IProgressData) => {
      setMessage((prev) => [data.message, ...prev]);
      setProgress(data.progress);

      console.log(data.message);
    });

    return () => {
      socket.off(`event:progress:${userToken}`);
    };
  }, [socket, userToken]);

  const getMessageStyle = () => {
    return {
      color: `hsl(${200 + (progress || 0) * 3}, 40%, 60%)`,
    };
  };

  return (
    <div className='progress'>
      <div style={getMessageStyle()} className='progress__message'>
        {message[0]}
      </div>
    </div>
  );
};

export default ProgressInfo;
