const routes = require('express').Router();
const path = require('path');

const getTemplate = require('./template/getTemplate');
const serverSideRenderer = require('./renderer.ssr');

const templatePath = path.resolve(__dirname, '../../build/index.html');

routes.get('*', (req, res) => {
  res.send(serverSideRenderer(getTemplate(templatePath)));
});

module.exports = routes;
