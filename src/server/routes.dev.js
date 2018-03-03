const routes = require('express').Router();
const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, './template/index.html');
const template = fs.readFileSync(templatePath, 'utf8').replace(
  /(<\/body\s*>)/i,
  match => `<script type="text/javascript" src="/assets/js/main.js"></script>${match}`,
);

routes.get('*', (req, res) => {
  res.send(template);
});

module.exports = routes;
