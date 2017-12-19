const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path:       path.join(__dirname, 'build'),
    filename:   'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel',
    },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'
      }],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  stats: {
        colors: true
    }
};

module.exports = config;
