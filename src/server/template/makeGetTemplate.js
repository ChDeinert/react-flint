const fs = require('fs');

module.exports = templatePath => () => fs.readFileSync(templatePath, 'utf8');
