const path = require('path');
const webpack = require('webpack');

module.exports = function(entry) {
  return {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      entry + 'index.jsx'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        include: path.join(__dirname, entry)
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: path.join(__dirname, 'css')
      }]
    }
  };
};
