import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';

const rootElement = document.getElementById('main');

ReactDOM.hydrate(<App />, rootElement);

if (module.hot && module.hot.accept) {
  module.hot.accept('../../App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../../App').default;

    ReactDOM.hydrate(<NextApp />, rootElement);
  });
}
