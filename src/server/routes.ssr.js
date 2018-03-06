const routes = require('express').Router();
const path = require('path');

const getTemplate = require('./template/getTemplate');
const makeServerSideRenderer = require('./renderer.ssr');

const templatePath = path.resolve(__dirname, '../../build/index.html');
const template = getTemplate(templatePath);
// eslint-disable-next-line import/no-unresolved
const App = require('../../build/app').default;

routes.get('*', (req, res) => {
  const serverSideRenderer = makeServerSideRenderer(template, App);
  res.send(serverSideRenderer());
});

module.exports = routes;
