const ReactDOMServer = require('react-dom/server');

module.exports = (template, App) => () =>
  template.replace(
    '<div id="main"></div>',
    `<div id="main">${ReactDOMServer.renderToString(App())}</div>`,
  );
