const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const cssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const fs = require('fs-extra');

const publicPath = '/assets';

const cssFilename = 'static/css/[name].[contenthash:8].css';

fs.emptyDirSync(path.resolve(__dirname, '../build'));

module.exports = {
  target: 'web',
  entry: [
    require.resolve('./polyfills'),
    './entrypoint/client/prod.js',
  ],
  devtool: 'nosources-source-map',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, '../build'),
    publicPath,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'react'],
                cacheDirectory: true,
              },
            },
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false,
                },
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
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
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                      }),
                    ],
                  },
                },
              ],
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/server/template/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};
