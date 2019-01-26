import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';

const rootElement = document.getElementById('main');

ReactDOM.hydrate(<App />, rootElement);

if (module.hot && module.hot.accept) {
  module.hot.accept('../../src/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../../src/App').default;

    ReactDOM.hydrate(<NextApp />, rootElement);
  });
}
