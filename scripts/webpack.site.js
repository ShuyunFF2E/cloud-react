const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildOutputDir = path.join(__dirname, '../cloud-react-site');
const resolve = dir => path.resolve(__dirname, '..',  dir);

const publicPath = '/';

module.exports = () => ({
	devtool: 'none',
	entry: {
		'app': './demos/index.js'
	},
	output: {
		path: buildOutputDir,
		publicPath,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css', 'less'],
				include: [resolve('src'), resolve('node_modules')]
			}
		]
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin([buildOutputDir]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css'
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'demos/index.html'
		})
	]
});
