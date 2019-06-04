const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const modeConfig = env => require(`./scripts/webpack.${env}`)(env);
const resolve = dir => path.resolve(__dirname, dir);

module.exports = ({ mode } = { mode: 'development' }) => {
	return webpackMerge(
		{
			mode,
			resolve: {
				alias: {
					'@utils': resolve('./src/utils/')
				},
				modules: [resolve(__dirname, './src'), 'node_modules'],
				extensions: ['.js']
			},
			resolveLoader: {
				moduleExtensions: ['-loader']
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: ['babel', 'eslint']
					},
					{
						test: /\.tpl\.html$/,
						exclude: /node_modules/,
						use: [
							{
								loader: 'html',
								options: {
									minimize: true
								}
							}
						]
					},
					{
						test: /\.url\.html$/,
						exclude: /node_modules/,
						loader: 'file'
					},
					{
						test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
						loader: 'url',
						options: {
							limit: 10000,
							name: '[name]-[hash:7].[ext]'
						}
					},
					{
						test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
						loader: 'url',
						options: {
							limit: 10000,
							name: '[name]-[hash:7].[ext]'
						}
					}
				]
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify(mode)
				}),
				new HtmlWebpackPlugin({
					filename: 'index.html',
					template: 'demos/index.html'
				}),
				// 分析打包大小问题
				// new WebpackBundleAnalyzer(),
				new webpack.ProgressPlugin()
			]
		},
		modeConfig(mode)
	);
};
