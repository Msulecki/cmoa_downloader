import './App.scss';
import SocketConnection from './components/SocketConnection/SocketConnection';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Settings from './components/Settings/Settings';
import ProgressInfo from './components/ProgressInfo/ProgressInfo';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import MessageHandler from './components/MessageHandler/MessageHandler';
import DownloadHandler from './components/DownloadHandler/DownloadHandler';

function App() {
  return (
    <div className='app'>
      <SocketConnection>
        <ErrorHandler />
        <MessageHandler />
        <DownloadHandler />
        <Header />
        <ProgressInfo />
        <Form />
        {/* <Settings /> */}
      </SocketConnection>
    </div>
  );
}

export default App;
