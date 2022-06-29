/* eslint-disable camelcase */
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

 const cmdStr = 'npm view cloud-react versions';

 const buffer = execSync(cmdStr);

 // 新版本取1开头的版本号
 const versions = eval(buffer.toString()).filter(f => f[0] === '1').slice(-10);
 const sortVersions = versions.sort((a, b) => {
   const [ a1, a2, a3 ] = a.split('.');
   const [ b1, b2, b3 ] = b.split('.');
   const [ a3_1, a3_2 = 0 ] = a3.split('-');
   const [ b3_1, b3_2 = 0 ] = b3.split('-');
   if (+a1 > +b1) return 1;
   if (+a2 > +b2) return 1;
   if (+a3_1 > +b3_1) return 1;
   if (+a3_2 > +b3_2) return 1;
   return -1;
 });
 const currVersion = sortVersions[sortVersions.length - 1];

 console.log(`目前npm上cloud-react版本(旧版本)为 ${currVersion}`);

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
