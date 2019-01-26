import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';

const rootElement = document.getElementById('main');

ReactDOM.hydrate(<App />, rootElement);
