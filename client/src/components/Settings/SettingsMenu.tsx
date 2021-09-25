import { ISettingsMenu } from '.';
import { useStateMerge } from '../../hooks';

const SettingsMenu = (props: ISettingsMenu) => {
  const { isVisible } = props;

  const [setting, setSetting] = useStateMerge();

  const menuClassName = `settings__menu${
    isVisible ? '' : ' settings__menu--hidden'
  }`;

  return (
    <section className={menuClassName}>
      <h2>Settings</h2>
      <div className='menu'>
        <span>It does nothing for now.</span>
        <div className='settings-item'>
          <div className='settings-item__input-wrapper'>
            <div className='settings-item__name'>img prefix</div>
            <input
              className='settings-item__input'
              type='text'
              defaultValue='img'
            />
          </div>
          <div className='settings-item__example'>img_1.png</div>
        </div>
      </div>
      <button className='menu__save'>Save</button>
    </section>
  );
};

export default SettingsMenu;
