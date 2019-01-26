const path = require('path');
const fs = require('fs-extra');

const webpackConfig = require('./webpack.config.base');

fs.emptyDirSync(path.resolve(__dirname, '../build'));
fs.emptyDirSync(path.resolve(__dirname, '../build-reports'));

webpackConfig.entry.push('./src/entrypoint/client/prod.js');

module.exports = webpackConfig;
