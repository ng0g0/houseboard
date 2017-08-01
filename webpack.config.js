var webpack = require('webpack')

module.exports = {
  entry: './index.js',

  output: {
	path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
	new webpack.DefinePlugin({
      'process.env': {
        'API_HOST': JSON.stringify('http://localhost:8080')
      } 
    })
  ] : [],
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}