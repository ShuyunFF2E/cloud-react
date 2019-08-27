const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, '..');

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
		rules: []
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'demos/index.html'
		})
	]
});
