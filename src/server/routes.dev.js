const routes = require('express').Router();
const fs = require('fs');
const path = require('path');
const env = require('../../config/env');

const templatePath = path.resolve(__dirname, './template/index.html');
let template = fs.readFileSync(templatePath, 'utf8').replace(
  /(<\/body\s*>)/i,
  match => `<script type="text/javascript" src="${env.publicPath}/js/main.js"></script>${match}`,
);
template = template.replace('<%= htmlWebpackPlugin.options.title %>', env.htmlTitle);

routes.get('*', (req, res) => {
  res.send(template);
});

module.exports = routes;
