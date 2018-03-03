const routes = require('express').Router();

const getTemplate = require('./template/getTemplate');

const serverSideRenderer = require('./renderer.ssr');

routes.get('*', (req, res) => {
  res.send(serverSideRenderer(getTemplate()));
});

module.exports = routes;
