var path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './app/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './build',
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'assets/stylesheet')],
    outputStyle: 'compressed'
  }
}
