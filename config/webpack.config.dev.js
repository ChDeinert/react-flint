const webpack = require('webpack');
const cssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfig = require('./webpack.config.base');

webpackConfig.mode = 'development';
webpackConfig.entry.push(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './src/entrypoint/client/dev.js',
);
webpackConfig.devtool = 'source-map';
webpackConfig.output.filename = 'js/[name].js';
webpackConfig.output.pathinfo = true;
webpackConfig.module.rules = [
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
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                cssImport(),
                postcssPresetEnv(),
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
webpackConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
  }),
];

module.exports = webpackConfig;
