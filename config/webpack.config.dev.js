const webpack = require('webpack');
const cssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpackConfig = require('./webpack.config.base');

webpackConfig.entry.push(
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './entrypoint/client/dev.js',
);
webpackConfig.devtool = 'source-map';
webpackConfig.output.filename = 'js/[name].js';
webpackConfig.output.pathinfo = true;
webpackConfig.module.rules = [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react'],
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
];
webpackConfig.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
  }),
];

module.exports = webpackConfig;
