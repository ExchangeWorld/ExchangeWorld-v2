const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/admin*', function(req, res) {
	res.sendFile(path.join(__dirname, 'src/admin/index.html'));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'src/app/index.html'));
});

// app.get('*', function(req, res) {
// 	res.sendFile(path.join(__dirname, 'src/index.html'));
// });

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});