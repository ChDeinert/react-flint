const template = require('./template/template.ssr');
const serverSideRenderer = require('./renderer.ssr');

module.exports = (app, assetManifest = {}) => {
  app.get('*', (req, res) => {
    res.send(template(assetManifest, serverSideRenderer()));
  });
};
