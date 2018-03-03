const ReactDOMServer = require('react-dom/server');
// eslint-disable-next-line import/no-unresolved
const App = require('../../build/app').default;

module.exports = template =>
  template.replace(
    '<div id="main"></div>',
    `<div id="main">${ReactDOMServer.renderToString(App())}</div>`,
  );
