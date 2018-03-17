const express = require('express');
const compression = require('compression');
const path = require('path');

const env = require('../../config/env');
const setupRoutes = require('../../src/server/setupRoutes');
const makeGetTemplate = require('../../src/server/template/makeGetTemplate');

const templatePath = path.resolve(__dirname, '../../build/index.html');
const routes = setupRoutes({
  router: express.Router(),
  getTemplate: makeGetTemplate(templatePath),
});

const app = express();

app.use(compression());
app.use(env.publicPath, express.static('build'));
app.use(routes);

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('listening at Port %s', env.appPort);
});
