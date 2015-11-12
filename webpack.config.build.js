const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		app: './src/app/index.jsx',
		admin: './src/admin/index.jsx',
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js',
		publicPath: 'http://localhost:3000/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
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
