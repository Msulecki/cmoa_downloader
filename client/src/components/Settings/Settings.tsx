import './Settings.scss';
import settingsIcon from '../../img/more.svg';
import SettingsMenu from './SettingsMenu';
import { useState } from 'react';

const Settings = () => {
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const toggleSettingsMenu = () => {
    setIsSettingsVisible((prev) => !prev);
  };
  const iconClassName = `settings__icon${
    isSettingsVisible ? '' : ' settings__icon--desaturated'
  }`;
  return (
    <>
      <div className='settings'>
        <button onClick={toggleSettingsMenu}>
          <img
            className={iconClassName}
            src={settingsIcon}
            alt='Additional settings'
          />
        </button>
      </div>
      <SettingsMenu isVisible={isSettingsVisible} />
    </>
  );
};

export default Settings;
