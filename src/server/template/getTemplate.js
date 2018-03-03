const fs = require('fs');
const path = require('path');

const templatePath = path.resolve(__dirname, '../../../build/index.html');
const template = fs.readFileSync(templatePath, 'utf8');

module.exports = () => template;
