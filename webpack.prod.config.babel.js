import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: [
    path.join(__dirname, '/src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
      options: {
        modules: true,
        localIdentName: '[name]---[local]---[hash:base64:5]',
      },
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
