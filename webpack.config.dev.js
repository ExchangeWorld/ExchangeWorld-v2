const path = require('path');
const webpack = require('webpack');
const nodeModules = path.join(__dirname, 'node_modules');
const pathToReactDOM = path.resolve(nodeModules, 'react-dom/dist/react-dom.min.js');

const deps = [
  'react/dist/react.min.js',
];

const config = {
	devtool: 'source-map',
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
	resolve: {
		alias: {
			'react-dom': pathToReactDOM,
		}
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
	],
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src'),
				exclude: path.join(__dirname, 'node_modules'),
			}, 
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!sass-loader!autoprefixer-loader?browsers=last 2 versions",
				include: path.join(__dirname, 'style'),
			}, 
			{ 
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "url-loader?limit=10000&mimetype=application/font-woff" 
			},
			{ 
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file-loader" 
			}
		],
		noParse: [],
	}
};

deps.forEach(function (dep) {
  var depPath = path.resolve(nodeModules, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});


module.exports = config;