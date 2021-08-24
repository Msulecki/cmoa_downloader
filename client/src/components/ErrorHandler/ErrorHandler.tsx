import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../SocketConnection/SocketConnection';
import './ErrorHandler.scss';

const ErrorHandler = () => {
  const { socket, userToken } = useContext(SocketContext);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const errorClassName = `error${!!isVisible ? ' error--visible' : ''}`;

  const handleErrorDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    socket.on(`event:error:${userToken}`, (data: { message: string }) => {
      setErrorMessage(`${data.message}`);
      setIsVisible(true);
    });

    return () => {
      socket.off(`event:error:${userToken}`);
    };
  }, [socket, userToken]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className={errorClassName}>
      {errorMessage}
      <button className='error__dismiss' onClick={handleErrorDismiss}>
        ×
      </button>
    </div>
  );
};

export default ErrorHandler;
