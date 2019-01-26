const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const path = require("path");
const fs = require("fs");
const chokidar = require("chokidar");

const webpackConfig = require("../../config/webpack.config.dev.ssr.js");
const env = require("../../config/env");
const setupRoutes = require("../../src/server/setupRoutes");
const makeServerSideRenderer = require("../../src/server/renderer.ssr");

const compiler = webpack(webpackConfig[0]);
const compilerServer = webpack(webpackConfig[1])
const templatePath = path.resolve(
  __dirname,
  "../../src/server/template/index.html"
);
const getTemplate = () => {
  let template = fs
    .readFileSync(templatePath, "utf8")
    .replace(
      /(<\/body\s*>)/i,
      match =>
        `<script type="text/javascript" src="${
          env.publicPath
        }js/main.js"></script>${match}`
    );
  template = template.replace(
    "<%= htmlWebpackPlugin.options.title %>",
    env.htmlTitle
  );
  return template;
};

webpackMiddlewareInstance = webpackDevMiddleware(compiler, {
  heartbeat: 2000,
  quiet: true,
  noInfo: true,
  publicPath: env.publicPath,
  stats: { colors: true },
  headers: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0"
  }
});
webpackMiddlewareInstanceServer = webpackDevMiddleware(compilerServer, {
  heartbeat: 2000,
  quiet: true,
  noInfo: true,
  publicPath: env.publicPath,
  stats: { colors: true },
  writeToDisk: true,
});

const app = express();

app.use(
  webpackHotMiddleware(compiler)
);

app.use(webpackMiddlewareInstance);
app.use(webpackMiddlewareInstanceServer);

const watcher = chokidar.watch(path.resolve(__dirname, "../../build/app.js"), {
  persistent: true
});
watcher.on("change", path => {
  Object.keys(require.cache).forEach(function(id) {
    if (path === id) {
      console.log(`Clearing ${path} module cache from server`);
      delete require.cache[id];
    }
  });
});

webpackMiddlewareInstanceServer.waitUntilValid(() => {
  app.use((req, res, next) => {
    // eslint-disable-next-line import/no-unresolved
    const clientApp = require("../../build/app").default;

    const serverSideRenderer = makeServerSideRenderer({
      template: getTemplate(),
      App: clientApp
    });

    const routes = setupRoutes({
      router: express.Router(),
      getTemplate: serverSideRenderer
    });

    routes(req, res, next);
  });

  app.listen(env.appPort, () => {
    // eslint-disable-next-line no-console
    console.log("listening at Port %s", env.appPort);
  });
});
