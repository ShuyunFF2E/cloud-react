const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 生成入口文件
const filePath = path.resolve(__dirname, '../src/components');
const files = fs.readdirSync(filePath);
const ignores = ['.DS_Store', 'index.js'];
const entry = {
	'index': './src/components/index.js'
};
files.forEach(name => {
	if (ignores.includes(name)) {
		return;
	}
	entry[name] = `./src/components/${name}/index.js`;
});

const buildOutputDir = path.join(__dirname, '../dist');

module.exports = () => ({
	devtool: 'none',
	entry,
	output: {
		filename: '[name].js',
		path: buildOutputDir
	},
	externals: {
		'react': 'react',
		'react-dom': 'react-dom'
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
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					discardComments: {removeAll: true},
					minifyGradients: true
				},
				canPrint: true
			})
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
