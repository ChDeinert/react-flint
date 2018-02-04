const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './entrypoint/client.js',
  ],
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/assets/static',
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            cacheDirectory: true,
            plugins: [
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
