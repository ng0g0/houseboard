var path = require('path');
const webpack = require('webpack');
const publicPath = '/prod/';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //Content 
  entry: './src/index',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, publicPath),
	filename: 'bundle.js',
    publicPath: publicPath,
    
  },
  devServer: {
	port: 3000,
    host: 'localhost',
    //Be possible go back pressing the "back" button at chrome
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath,
    contentBase: path.join(__dirname, publicPath),
    //hotmodulereplacementeplugin
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement'
    }),
  ],
  module: {
    rules: [
      { 
	    test: /\.js?$/, 
        exclude: /node_modules/ ,
		loaders: ['babel-loader']
	  },
      { 
       test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  }
};