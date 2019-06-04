const fs = require('fs');
const path = require('path');

// const { getOptions } = require('loader-utils');

const regexpGen = /\/\* <% dynamicExample begin %> \*\/[\w\W]*\/\* <% dynamicExample end %> \*\//;

function  transformName(name) {
	return name.replace(/^(\w)/, (s, $1) => $1.toUpperCase());
}

function combinationName(name) {
	return name.replace(/-(\w)/g, (s, $1) => $1.toUpperCase());
}

// 判断文件/目录是否存在
function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch(e) {
		return false;
	}
	return true;
}

// 扫描所有组件的目录
function scanningTargetPath(context) {
	const result = {
    imports: [],
		menus: []
	};

	fs.readdirSync(context).forEach((dir) => {
		const fullDir = path.resolve(context, dir);
		const stat = fs.statSync(fullDir);

		if (stat.isDirectory()) {
      const moduleName = combinationName(transformName(dir));

      result.imports.push({ name: moduleName, dir: `./${dir}` });
			result.menus.push({ path: `/${dir}`, label: moduleName, component: moduleName });
		}
	});

	return result;
}

// 生成导出import的代码
function generateImportCodes(imports = []) {
	const res = imports.map(({ name, dir }) => `import ${name} from '${dir}';`);

  return res.join('\n');
}

function generateMenuCodes(menus = []) {
	const res = menus.map(({ path, label, component }) => `{ path: '${path}', label: '${label}', component: ${component} }`);

	return `
		const menus = [
			${res.join(',\n')}
		]
	`;
}

function mergeCode(importCodes, constMenuCode) {
	return `
		/* eslint-disable */

		// import modules
		${importCodes}

		// const menus
		${constMenuCode}
	`;
}

module.exports = function(source) {
  this.cacheable(false);

  if(regexpGen.test(source)) {
		const { imports, menus } = scanningTargetPath(this.context);

    if(imports.length) {
			const importCodes = generateImportCodes(imports);
			const constMenuCode = generateMenuCodes(menus);

      source = source.replace(regexpGen, mergeCode(importCodes, constMenuCode));
    }
	}

  return source;
}
