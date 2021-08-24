import icon from '../../img/book.svg';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <div>
        <img src={icon} alt='Cmoa downloader' />
      </div>
      <h1>Cmoa downloader</h1>
    </header>
  );
};

export default Header;
