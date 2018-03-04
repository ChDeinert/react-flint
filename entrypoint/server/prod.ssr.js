const express = require('express');

const env = require('../../config/env');
const routes = require('../../src/server/routes.ssr');

const app = express();

app.use(env.publicPath, express.static('build'));

app.use(routes);

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('listening at Port %s', env.appPort);
});
