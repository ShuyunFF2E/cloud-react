const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('../package.json');

const buildOutputDir = path.join(__dirname, '../dist');
const resolve = dir => path.resolve(__dirname, '..', dir);

module.exports = () => ({
	devtool: 'none',
	entry: {
		[pkg.name]: './src/components/index.js'
	},
	output: {
		filename: '[name].js',
		path: buildOutputDir,
		library: 'CloudReact',
		libraryTarget: 'umd',
		auxiliaryComment: {
			root: 'CloudReact',
			commonjs: 'cloud-react',
			commonjs2: 'cloud-react',
			amd: 'cloud-react'
		}
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
	externals: {
		react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
	},
	performance: {
		hints: false
	},
	optimization: {
		minimizer: [
			// 压缩js
			new UglifyJsPlugin({
				uglifyOptions: {
					cache: true,
					parallel: true,
					sourceMap: true,
					warnings: false
				}
			}),
			// 压缩css
			new OptimizeCSSAssetsPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin([buildOutputDir], {
			root: process.cwd()
		}),
		new webpack.BannerPlugin(`
${pkg.name} v${pkg.version}
Copyright 2019-present, Shuyun, Inc.
All rights reserved.
		`),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css'
		}),
		new CopyWebpackPlugin([
			{ from: path.join(__dirname, '../package.json'), to: '', toType: 'file' },
			{ from: path.join(__dirname, '../README.md'), to: '', toType: 'file' }
		])
	]
});
