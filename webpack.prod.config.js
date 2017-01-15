const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './app/main.js'],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
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
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'app', 'stylesheet')
      },
      {
        test: /\.png$/,
        loader: 'file'
      }
    ]
  }
}
