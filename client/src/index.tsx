import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Error initializing container');
}

const root = ReactDOM.createRoot(container);

root.render(<App />);
