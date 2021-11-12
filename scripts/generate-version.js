/**
 * eg: npm run cli-version mode=develop/prod
 * 配合企业级 devops 流水线
 */

const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
let params = {};

if (args.length) {
	args.forEach(item => {
		const i = item.split('=');
		params[i[0]] = i[1];
	});
} else {
	throw new Error('命令行参数错误，缺少mode参数');
}

function getPackageJson() {
	console.log('------ 开始读取package.json -------');
	const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'));
	console.log('------ 读取package.json文件完毕 -------');
	return JSON.parse(packageJson);
}

const cmdStr = 'npm view cloud-react version';

const buffer = execSync(cmdStr);
const currVersion = buffer.toString().replace(/\n/, '');

console.log(`目前npm上cloud-react版本为 ${currVersion}`);

const calcNext = mode => {
	const arr = currVersion.split('.');
	if (mode === 'prod') {
		const r = arr[2].split('-');
		if (r.length === 1) {
			return `${arr[0]}.${arr[1]}.${Number(arr[2]) + 1}`;
		}
		return `${arr[0]}.${arr[1]}.${Number(r[0]) + 1}`;
	} else {
		const r = arr[2].split('-');
		if (r.length === 1) {
			return currVersion + '-1';
		}
		return currVersion.substr(0, currVersion.indexOf('-')) + '-' + (Number(r[1]) + 1);
	}
};

const package = getPackageJson();

package.version = calcNext(params.mode);

console.log('package.version:', package.version);

fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(package));

console.log(`------ 本次生成新版本号：${package.version} -------`);
