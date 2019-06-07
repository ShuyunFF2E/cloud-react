const fs = require('fs');
const path = require('path');
const getOptions = require('loader-utils').getOptions;

const regexpGen = /\/\* <% dynamicDocs begin %> \*\/[\w\W]*\/\* <% dynamicDocs end %> \*\//;
const markdownFileGen = /\w+\.md$/;

function combinationName(name) {
	return name.replace(/-(\w)/g, (s, $1) => $1.toUpperCase());
}

function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch(e) {
		return false;
	}
	return true;
}

function scanningTargetPath({ path: context, importPath, filename = 'index.md' }) {
	const introduce = [];
	const values = [];

	fs.readdirSync(context).forEach((file) => {
		const fullPath = path.join(context, file);
		const stat = fs.statSync(fullPath);

		if (stat.isFile() && markdownFileGen.test(file)) {
			const [name] = file.split(/\.md$/i)
      		const moduleName = combinationName(name);

      		introduce.push({ name: moduleName, dir: `${importPath}/${file}` });
			values.push({ path: `/${name}`, label: moduleName, result: moduleName });

		} else if (stat.isDirectory() && fsExistsSync(`${fullPath}/${filename}`)) {
      		const moduleName = combinationName(file);

      		introduce.push({ name: moduleName, dir: `${importPath}/${file}/${filename}` });
			values.push({ path: `/${file}`, label: moduleName, result: moduleName });
		}
	});

	return {
		introduce,
		values
	};
}

function generateImportCodes(imports = []) {
	const res = imports.map(({ name, dir }) => `import ${name} from '${dir}';`);

  return res.join('\n');
}

function generateDocsCodes(menus = []) {
	const res = menus.map(({ path, label, result }) => `{ path: '${path}', label: '${label}', result: ${result} }`);

	return `
		const docs = [
			${res.join(',\n')}
		]
	`;
}

function mergeCode(importCodes, constDocsCode) {
	return `
		/* eslint-disable */

		// import modules
		${importCodes}

		// const docs
		${constDocsCode}
	`;
}

module.exports = function(source) {
	this.cacheable(false);

	if (!regexpGen.test(source)) return source;

	const { target = [] } = getOptions(this);

	const imports = [];
	const result = [];
	let index = 0;

	while (index < target.length) {
		const { introduce, values } = scanningTargetPath(target[index]);

		imports.push(...introduce);
		result.push(...values);

		index++;
	}

	if(imports.length) {
		const importCodes = generateImportCodes(imports);
		const constDocsCode = generateDocsCodes(result);

		source = source.replace(regexpGen, mergeCode(importCodes, constDocsCode));
	}

  return source;
}
