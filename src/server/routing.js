const template = require('./template');

module.exports = (app, assetManifest = {}) => {
  app.get('*', (req, res) => {
    res.send(template(assetManifest));
  });
};
