const path = require('path');
const webpack = require('webpack');
const cssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

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
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
