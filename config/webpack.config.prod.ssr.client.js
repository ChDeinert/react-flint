const path = require('path');
const fs = require('fs-extra');

const webpackConfig = require('./webpack.config.base');

fs.emptyDirSync(path.resolve(__dirname, '../build'));
fs.emptyDirSync(path.resolve(__dirname, '../build-reports'));

webpackConfig.entry.push('./entrypoint/client/prod.ssr.js');

module.exports = webpackConfig;
