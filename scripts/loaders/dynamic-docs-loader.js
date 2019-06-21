const fs = require('fs');
const path = require('path');
const getOptions = require('loader-utils').getOptions;

const resolve = (...a) => path.resolve(...a).replace(/^[^@]+@/, '@');

const regexpGen = /\/\* <% dynamicDocs begin %> \*\/[\w\W]*\/\* <% dynamicDocs end %> \*\//;
const markdownFileGen = /\w+\.md$/;

function combinationName(name) {
	return name.replace(/-(\w)/g, (s, $1) => $1.toUpperCase());
}
function  transformName(name) {
	return name.replace(/^(\w)/, (s, $1) => $1.toUpperCase());
}

function fsExistsSync(path) {
	try {
		fs.accessSync(path, fs.F_OK);
	} catch(e) {
		return false;
	}
	return true;
}

function scanningTargetPath({ path: context, importPath, filename = 'index.md', demoDirectory = 'demos' }) {
	const introduces = [];
	const values = [];

	fs.readdirSync(context).forEach((file) => {
		const fullPath = path.join(context, file);
		const stat = fs.statSync(fullPath);
		let [introduce, value] = [];

		if (stat.isFile() && markdownFileGen.test(file)) {
			const [name] = file.split(/\.md$/i)
      		const moduleName = combinationName(name);

			value = { path: `/${name}`, label: moduleName, result: moduleName };
      		introduce = { name: moduleName, dir: resolve(importPath, file) };

		} else if (stat.isDirectory() && fsExistsSync(resolve(fullPath, filename))) {
      		const moduleName = combinationName(file);

			value = { path: `/${file}`, label: moduleName, result: moduleName };
      		introduce = { name: moduleName, dir: resolve(importPath, file, filename) };
		}

		// loader demos
		const demoFullDirectory = resolve(fullPath, demoDirectory);

		if (stat.isDirectory() && fsExistsSync(demoFullDirectory)) {
			value.demos = [];
			fs.readdirSync(demoFullDirectory).forEach((demoFile) => {
				const [name] = demoFile.split('.');
      			const moduleName = transformName(combinationName(`${file}-${name}`));

				introduces.push({ name: moduleName, dir: resolve(importPath, file, demoDirectory, demoFile) });
				value.demos.push(moduleName);
			});
		}

		if (value && introduce) {
			values.push(value);
			introduces.push(introduce);
		}
	});

	return {
		introduces,
		values
	};
}

function generateImportCodes(imports = []) {
	const res = imports.map(({ name, dir }) => {
		const crossEnvPath = dir.split(path.sep).join('/');
		return `import ${name} from '${crossEnvPath}';` 
	});
	return res.join('\n');
}

function generateDocsCodes(menus = []) {
	const res = menus.map(({ path, label, result, demos }) => `{ path: '${path}', label: '${label}', result: ${result}, demos: [${demos}] }`);

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
		const { introduces, values } = scanningTargetPath(target[index]);

		imports.push(...introduces);
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
