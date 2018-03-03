const ReactDOMServer = require('react-dom/server');
// eslint-disable-next-line import/no-unresolved
const App = require('../../build/app').default;

module.exports = () => ReactDOMServer.renderToString(App());
