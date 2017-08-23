var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './http/index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'app.bundle.js'
    },
    module: {
      loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015', 'react']
        }
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      }
      ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};