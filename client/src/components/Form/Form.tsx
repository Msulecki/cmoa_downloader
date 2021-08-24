import React, { useContext, useEffect, useState } from 'react';
import './Form.scss';
import FormInput from './FormInput';
import iconMail from '../../img/email.svg';
import iconPassword from '../../img/key.svg';
import iconUrl from '../../img/link.svg';
import { SocketContext } from '../SocketConnection/SocketConnection';

const inputNames = ['email', 'password', 'url'];

const Form = () => {
  const { socket, userToken } = useContext(SocketContext);

  const [isScrappingInProgress, setIsScrappingInProgress] =
    useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const { elements } = form;

    const data = inputNames.map((inputName) => [
      inputName,
      (elements.namedItem(inputName) as RadioNodeList).value,
    ]);

    const dataObject = Object.fromEntries(data);

    form.reset();

    socket.emit('post:scrap-data', { data: dataObject });
  };

  useEffect(() => {
    socket.on(`event:start:${userToken}`, () => {
      setIsScrappingInProgress(true);
    });

    return () => {
      socket.off(`event:start:${userToken}`);
    };
  }, [socket, userToken]);

  useEffect(() => {
    socket.on(`event:end:${userToken}`, () => {
      setIsScrappingInProgress(false);
    });

    return () => {
      socket.off(`event:end:${userToken}`);
    };
  }, [socket, userToken]);

  useEffect(() => {
    socket.on(`event:error:${userToken}`, (data: { message: string }) => {
      console.log(`%c error: ${data.message}`, 'color:#DD6666;');

      setIsScrappingInProgress(false);
    });

    return () => {
      socket.off(`event:error:${userToken}`);
    };
  }, [socket, userToken]);

  return (
    <form className='form' onSubmit={handleSubmit}>
      <FormInput
        type='email'
        name='email'
        placeholder='Email address'
        icon={iconMail}
        alt='Email address from CMOA'
      />
      <FormInput
        type='password'
        name='password'
        placeholder='Password'
        icon={iconPassword}
        alt='Password from CMOA'
      />
      <FormInput
        type='text'
        name='url'
        placeholder='Url address'
        icon={iconUrl}
        alt='Url to CMOA manga'
      />

      <div className='form__group form__group--detached'>
        <input type='submit' value='Fire' disabled={isScrappingInProgress} />
      </div>
    </form>
  );
};

export default Form;
