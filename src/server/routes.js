const routes = require('express').Router();
const path = require('path');

const getTemplate = require('./template/getTemplate');

const templatePath = path.resolve(__dirname, '../../build/index.html');

routes.get('*', (req, res) => {
  res.send(getTemplate(templatePath));
});

module.exports = routes;
