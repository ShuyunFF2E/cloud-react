const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, '..');
const resolve = dir => path.resolve(__dirname, '..', dir);

const publicPath = '/';

const devServer = {
	clientLogLevel: 'warning',
	disableHostCheck: true,
	hot: true,
	contentBase: srcDir,
	compress: true,
	overlay: {
		warnings: false,
		errors: true
	}
};

module.exports = () => ({
	devServer,
	devtool: 'cheap-module-eval-source-map',
	entry: {
		'app': './demos/index.js'
	},
	output: {
		publicPath,
		filename: '[name].js'
	},
	bail: true,
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				use: ['style', 'css', 'less'],
				include: [resolve('src'), resolve('node_modules')]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'demos/index.html'
		})
	]
});
