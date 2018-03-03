import ReactDOM from 'react-dom';
import App from '../src/App';

const rootElement = document.getElementById('main');

ReactDOM.hydrate(App(), rootElement);
