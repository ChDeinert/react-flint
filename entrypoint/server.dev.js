const express = require('express');
const fs = require('fs');

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require('webpack-dev-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../config/webpack.config.dev.js');
const routing = require('../src/server/routing');

const dotEnvPath = process.env.DOT_ENV_PATH || '.env';
fs.exists(dotEnvPath, exists =>
  // eslint-disable-next-line no-console
  console.log(exists ? 'Info: Using %s' : 'Info: %s not found, using defaults', dotEnvPath));
require('dotenv').load({ path: dotEnvPath, silent: true });

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  heartbeat: 2000,
  quiet: true,
  noInfo: true,
  publicPath: '/assets/static/',
  stats: { colors: true },
}));
app.use(webpackHotMiddleware(compiler, {
  dynamicPublicPath: true,
}));

routing(app);

app.listen(process.env.APP_PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('listening at http://localhost:%s', process.env.APP_PORT || 8080);
});
