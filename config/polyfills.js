if (typeof Promise === 'undefined') {
  // eslint-disable-next-line global-require
  require('promise/lib/rejection-tracking').enable();
  // eslint-disable-next-line global-require
  window.Promise = require('promise/lib/es6-extensions.js');
}

require('whatwg-fetch');
Object.assign = require('object-assign');
