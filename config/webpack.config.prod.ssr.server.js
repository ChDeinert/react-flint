const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfig = require('./webpack.config.base');

const cssFilename = '[name].css';

webpackConfig.target = 'node';
webpackConfig.entry = { app: ['./src/App'] };
webpackConfig.output.filename = '[name].js';
webpackConfig.output.libraryTarget = 'commonjs2';
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      safari10: true,
    },
    sourceMap: true,
  }),
  new ExtractTextPlugin({
    filename: cssFilename,
  }),
  new ManifestPlugin({
    fileName: 'asset-manifest.ssr.json',
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: '../build-reports/report.ssr.html',
  }),
];

module.exports = webpackConfig;
