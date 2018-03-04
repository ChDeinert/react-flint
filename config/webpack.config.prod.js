const path = require('path');
const fs = require('fs-extra');

const webpackConfig = require('./webpack.config.base');

fs.emptyDirSync(path.resolve(__dirname, '../build'));

webpackConfig.entry.push('./entrypoint/client/prod.js');

module.exports = webpackConfig;
