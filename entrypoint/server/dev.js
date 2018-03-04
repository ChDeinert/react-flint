const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../../config/webpack.config.dev.js');
const env = require('../../config/env');
const routes = require('../../src/server/routes.dev');

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  heartbeat: 2000,
  quiet: true,
  noInfo: true,
  publicPath: env.publicPath,
  stats: { colors: true },
}));
app.use(webpackHotMiddleware(compiler, {
  dynamicPublicPath: true,
}));

app.use(routes);

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('listening at Port %s', env.appPort);
});
