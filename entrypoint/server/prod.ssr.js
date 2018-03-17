const express = require('express');
const compression = require('compression');
const path = require('path');

const env = require('../../config/env');
const setupRoutes = require('../../src/server/setupRoutes');
const makeGetTemplate = require('../../src/server/template/makeGetTemplate');
const makeServerSideRenderer = require('../../src/server/renderer.ssr');
// eslint-disable-next-line import/no-unresolved
const clientApp = require('../../build/app').default;

const templatePath = path.resolve(__dirname, '../../build/index.html');
const getTemplate = makeGetTemplate(templatePath);
const serverSideRenderer = makeServerSideRenderer({
  template: getTemplate(),
  App: clientApp,
});

const routes = setupRoutes({
  router: express.Router(),
  getTemplate: serverSideRenderer,
});

const app = express();

app.use(compression());
app.use(env.publicPath, express.static('build'));
app.use(routes);

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('listening at Port %s', env.appPort);
});
