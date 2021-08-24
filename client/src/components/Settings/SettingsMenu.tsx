import { ISettingsMenu } from '.';

const SettingsMenu = (props: ISettingsMenu) => {
  const { isVisible } = props;

  const menuClassName = `settings__menu${
    isVisible ? '' : ' settings__menu--hidden'
  }`;

  return (
    <section className={menuClassName}>
      <h2>Settings</h2>
      <div className='menu'></div>
    </section>
  );
};

export default SettingsMenu;
