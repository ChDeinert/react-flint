const template = require('./template/template');

module.exports = (app, assetManifest = {}) => {
  app.get('*', (req, res) => {
    res.send(template(assetManifest));
  });
};
