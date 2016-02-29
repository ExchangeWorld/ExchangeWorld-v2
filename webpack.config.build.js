var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var nodeModules = path.join(__dirname, 'node_modules');
var pathToReactDOM = path.resolve(nodeModules, 'react-dom/dist/react-dom.min.js');

var deps = [
	'react/dist/react.min.js',
	'i18next/bin/index.js',
	'i18next-xhr-backend/bin/index.js',
	'i18next-localstorage-cache/bin/index.js',
];

var config = {
	devtool: 'eval',
	entry:  {
		app: [
			'./src/app/index.jsx'
		],
		admin: [
			'./src/admin/index.jsx'
		],
	},
	resolve: {
		alias: {
			'react-dom': pathToReactDOM,
		},
		extensions: ["", ".jsx", ".js", ".scss"],
	},
	output: {
		path: path.join(__dirname, 'dist/public/'),
		filename: 'js/[name].js',
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
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
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				],
				include: path.join(__dirname, 'style'),
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
				include: path.join(__dirname, 'style'),
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader?name=fonts/[name].[ext]"
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=imgs/[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		],
		noParse: [],
	},
	postcss: function () {
		return [autoprefixer];
	},
};

deps.forEach(function (dep) {
	var depPath = path.resolve(nodeModules, dep);
	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
	config.module.noParse.push(depPath);
});

module.exports = config;
