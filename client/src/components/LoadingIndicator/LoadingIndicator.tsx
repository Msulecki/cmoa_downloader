import { useEffect } from 'react';
import { useState } from 'react';
import './LoadingIndicator.scss';

let feedbackMessageTimeout: NodeJS.Timeout;

const LoadingIndicator = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');

  useEffect(() => {
    feedbackMessageTimeout = setTimeout(() => {
      setFeedbackMessage('Connecting takes longer than expected...');
    }, 3000);

    feedbackMessageTimeout = setTimeout(() => {
      setFeedbackMessage('Something is wrong, try to refresh the page.');
    }, 10000);

    feedbackMessageTimeout = setTimeout(() => {
      setContactInfo('If problem still occurs, tell me:');
    }, 12000);

    return () => {
      clearTimeout(feedbackMessageTimeout);
    };
  }, []);

  return (
    <div className='loader'>
      <div className='loader__body'>
        {new Array(16).fill(null).map((_, index) => (
          <div key={index} className='loader__item'></div>
        ))}
      </div>
      <div className='loader__message'>
        <span className='loader__message--error'>{feedbackMessage}</span>
        {contactInfo && (
          <span className='loader__message--subtext'>
            {contactInfo}
            <address className='loader__message--address'>
              <a href='mailto:hello@syntax.website?subject=Cmoa page error'>
                hello@syntax.website
              </a>
            </address>
          </span>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
