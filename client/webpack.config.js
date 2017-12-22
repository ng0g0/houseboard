const webpack = require('webpack');
const path = require('path');

const config = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
      path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel',
    }],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
  plugins: [
    new webpack.DefinePlugin({ 
	'process.env': { 
		NODE_ENV: JSON.stringify('production'),
		'API_HOST': 'http://localhost:5000'
		} 
	}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      minimize: true,
	  sourceMap: true
    }),
  ],
  stats: {
        colors: true
    }
};

module.exports = config;
