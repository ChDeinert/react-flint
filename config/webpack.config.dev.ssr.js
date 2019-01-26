const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const cssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const cloneDeep = require('lodash/cloneDeep');

const webpackConfigBase = require('./webpack.config.base');

const webpackConfigClient = cloneDeep(webpackConfigBase);
const webpackConfigServer = cloneDeep(webpackConfigBase);

fs.emptyDirSync(path.resolve(__dirname, '../build'));
fs.emptyDirSync(path.resolve(__dirname, '../build-reports'));

webpackConfigClient.name = 'Client';
webpackConfigClient.entry.push(
  'webpack-hot-middleware/client',
  './entrypoint/client/dev.ssr.js',
);
webpackConfigClient.mode = 'development';
webpackConfigClient.devtool = 'source-map';
webpackConfigClient.output.filename = 'js/[name].js';
webpackConfigClient.output.pathinfo = true;
webpackConfigClient.module.rules = [
  {
    oneOf: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                cssImport(),
                cssnext({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                }),
              ],
            },
          },
        ],
      },
      {
        loader: require.resolve('file-loader'),
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
        options: {
          name: 'media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
];
webpackConfigClient.plugins = [
  new webpack.HotModuleReplacementPlugin(),
];
// webpackConfigClient.entry.push("./entrypoint/client/prod.ssr.js");

webpackConfigServer.name = 'Server';
webpackConfigServer.mode = 'development';
webpackConfigServer.target = 'node';
webpackConfigServer.entry = { app: ['./src/App'] };
webpackConfigServer.output.filename = '[name].js';
webpackConfigServer.output.libraryTarget = 'commonjs2';
webpackConfigServer.externals = /^[a-z\-0-9]+$/;
webpackConfigServer.module = {
  rules: [
    {
      oneOf: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                exportOnlyLocals: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: () => [
                  cssImport(),
                  cssnext({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                  }),
                ],
              },
            },
          ],
        },
        {
          loader: require.resolve('file-loader'),
          exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
  ],
};
webpackConfigServer.plugins = [];

module.exports = [webpackConfigClient, webpackConfigServer];
