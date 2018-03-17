const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const fs = require('fs');

const webpackConfig = require('../../config/webpack.config.dev.js');
const env = require('../../config/env');
const setupRoutes = require('../../src/server/setupRoutes');

const compiler = webpack(webpackConfig);
const templatePath = path.resolve(__dirname, '../../src/server/template/index.html');
const getTemplate = () => {
  let template = fs.readFileSync(templatePath, 'utf8').replace(
    /(<\/body\s*>)/i,
    match => `<script type="text/javascript" src="${env.publicPath}js/main.js"></script>${match}`,
  );
  template = template.replace('<%= htmlWebpackPlugin.options.title %>', env.htmlTitle);
  return template;
};
const routes = setupRoutes({
  router: express.Router(),
  getTemplate,
});

const app = express();

app.use(webpackDevMiddleware(compiler, {
  heartbeat: 2000,
  quiet: true,
  noInfo: true,
  publicPath: env.publicPath,
  stats: { colors: true },
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
}));
app.use(webpackHotMiddleware(compiler, {
  dynamicPublicPath: true,
}));
app.use(routes);

app.listen(env.appPort, () => {
  // eslint-disable-next-line no-console
  console.log('listening at Port %s', env.appPort);
});
