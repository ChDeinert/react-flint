const routes = require('express').Router();

const getTemplate = require('./template/getTemplate');

routes.get('*', (req, res) => {
  res.send(getTemplate());
});

module.exports = routes;
