/**
 * 生成components/index.js 脚本
 * @type {module:path}
 */
const path = require('path');
const fs = require('fs');
const filePath = path.resolve(__dirname, '../src/components');
const indexFile = path.resolve(__dirname, '../src/components/index.js');
const { name } = require('../package.json');

// 忽略列表
const ignores = ['.DS_Store', 'index.js'];

// 获取组件列表
const files = fs.readdirSync(filePath);

// 通过文件夹名称生成组件名称
const toComponentsName = text => {
	return text.replace(/-\w/g, str => {
		return str.split('-')[1].toUpperCase();
	}).replace(/^[A-Za-z]/, str => {
		return str.toLocaleUpperCase();
	});
};

// 生成代码
const description = '/* components/index.js文件 是通过 /script/generate-index.js文件生成的 */';
const condition = `
// 检验当前运行环境
if( typeof window === 'undefined' ) {
	console.warn('${name} 仅支持在浏览器环境进行使用!');
}
`;
let fileCode = '';
files.forEach(item => {
	if (ignores.includes(item)) {
		return;
	}
	const fileName = toComponentsName(item);
	fileCode += `export { default as ${fileName} } from './${item}';\n\n`;
});

const indexCode = `${description}\n${condition}\n${fileCode}`;
fs.writeFile(indexFile, indexCode, function (err) {
	if (err) throw err;
});
