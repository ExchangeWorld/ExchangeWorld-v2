const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: {
		app: [
			'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
			'./src/app/index.jsx'
		],
		admin: [
			'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
			'./src/admin/index.jsx'
			],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js',
		publicPath: 'static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader",
			include: path.join(__dirname, 'src')
		}]
	}
};
