const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildOutputDir = path.join(__dirname, '../dist');

module.exports = () => ({
	devtool: 'none',
	module: {
		rules: [
			// {
			// 	test: /\.(le|c)ss$/,
			// 	use: [MiniCssExtractPlugin.loader, 'css', 'less']
			// }
		]
	},
	entry: {
		'component': './src/components/index.js'
	},
	output: {
		filename: 'index.js',
		path: buildOutputDir
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin([buildOutputDir]),
		new MiniCssExtractPlugin({
			filename: '[name]-[hash:20].css',
			chunkFilename: '[name].[hash:20].css'
		}),
		new CopyWebpackPlugin([
			{from: path.join(__dirname, '../package.json'), to: '', toType: 'file'},
			{from: path.join(__dirname, '../README.md'), to: '', toType: 'file'}
		])
	]
});
