const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

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
		filename: '[name]-[hash:20].js',
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
		new CleanWebpackPlugin(buildOutputDir, {
			root: process.cwd()
		}),
		new MiniCssExtractPlugin({
			filename: '[name]-[hash:20].css',
			chunkFilename: '[name].[hash:20].css'
		}),
		new CompressionWebpackPlugin()
	]
});
