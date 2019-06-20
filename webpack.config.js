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
					'@utils': resolve('./src/utils/'),
					'@components': resolve('./src/components'),
					'@docs': resolve('./docs'),
					'ccms-components-react': resolve('./src/components')
				},
				modules: [resolve(__dirname, './src'), 'node_modules'],
				extensions: ['.js']
			},
			resolveLoader: {
				modules: ['node_modules', path.join(__dirname, './scripts/loaders')],
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
					},
					{
						test: /\.(le|c)ss$/,
						use: ['style', 'css', 'less'],
						include: resolve('src')
					},
					{
						test: /\.(le|c)ss$/,
						use: [
							'style',
							{
								loader: 'css',
								options: {
									modules: true,
									camelCase: true,
									localIdentName: '[local]_[hash:base64:5]'
								}
							},
							'less'
						],
						include: resolve('demos')
					},
					{
						test: /\.js$/,
						loader: 'dynamic-docs-loader',
						options: {
							target: [
								{ path: resolve('./docs'), importPath: '@docs' },
								{ path: resolve('./src/components'), importPath: '@components' },
							]
						},
						include: resolve('demos')
					},
					{
						test: /\.md$/,
						loader: 'markdown',
						options: {
							pattern: /#{1,6}\s+API/,
							insert: {
								before: true,
								value: '### 代码演示\n<div id="code-demo"></div>'
							}
						}
					},
					{
						test: /\.markdown$/,
						loader: ['babel', 'markdown-react'],
						include: path.resolve(__dirname, 'src', 'components')
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
