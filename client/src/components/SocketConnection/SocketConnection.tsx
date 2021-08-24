import { createContext } from 'react';
import { ISocketConnection } from '.';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import getUniqueId from '../../helpers/getUniqueId';

const socket = io(process.env.REACT_APP_SERVER as string, {
  transports: ['websocket'],
  timeout: 120000,
});

export const SocketContext = createContext<any>({ socket });

const SocketConnection = (props: ISocketConnection) => {
  const { children } = props;

  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>();

  useEffect(() => {
    socket.on('connect', () => {
      const token = getUniqueId();

      setUserToken(token);
      setIsSocketConnected(true);
    });

    socket.on('disconnect', (reason: any) => {
      console.log('disconnect event', reason);
    });

    return () => {
      socket.off('connect');

      socket.off('disconnect in return', (reason: any) => {
        console.log('disconnect', reason);
      });
    };
  }, []);

  useEffect(() => {
    if (userToken) {
      socket.emit('handshake', { userToken });
    }
  }, [userToken]);

  if (!isSocketConnected) {
    return <LoadingIndicator />;
  }

  return (
    <SocketContext.Provider value={{ socket, userToken }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketConnection;
