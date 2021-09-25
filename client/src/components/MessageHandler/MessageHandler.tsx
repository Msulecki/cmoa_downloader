import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../SocketConnection/SocketConnection';
import { IMessage } from '.';
import './MessageHandler.scss';

const MessageHandler = () => {
  const { socket, userToken } = useContext(SocketContext);

  const [messageData, setMessageData] = useState<IMessage>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const messageClassName = `message${!!isVisible ? ' message--visible' : ''}`;

  const handleMessageDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    socket.on(
      `event:message:${userToken}`,
      (data: { message: string; url: string }) => {
        setMessageData(data);

        setIsVisible(true);
      }
    );

    return () => {
      socket.off(`event:message:${userToken}`);
    };
  }, [socket, userToken]);

  if (!messageData) {
    return null;
  }

  return (
    <div className={messageClassName}>
      <span>
        {messageData.message}
        {messageData.url && (
          <a
            href={`${window.location}${messageData.url}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {messageData.urlDesc || messageData.url}
          </a>
        )}
      </span>
      <button className='message__dismiss' onClick={handleMessageDismiss}>
        ×
      </button>
    </div>
  );
};

export default MessageHandler;
