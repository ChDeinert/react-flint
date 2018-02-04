const template = require('./template');

module.exports = (app) => {
  app.get('*', (req, res) => {
    res.send(template());
  });
};
