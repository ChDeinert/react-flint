const routes = require('express').Router();
const fs = require('fs');
const path = require('path');
const env = require('../../config/env');

const templatePath = path.resolve(__dirname, './template/index.html');
const template = fs.readFileSync(templatePath, 'utf8').replace(
  /(<\/body\s*>)/i,
  match => `<script type="text/javascript" src="${env.publicPath}/js/main.js"></script>${match}`,
);

routes.get('*', (req, res) => {
  res.send(template);
});

module.exports = routes;
