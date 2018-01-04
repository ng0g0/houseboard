const path = require('path')
const webpack = require('webpack');
const publicPath = '/prod/';

 module.exports = {
  devtool: 'source-map',

  entry: [
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'prod'),
    filename: 'bundle.js',
    publicPath: '/prod'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
	  beautify: false,
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      }
    ]
  }
}