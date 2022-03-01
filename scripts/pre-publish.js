const path = require('path');
const fs = require('fs');

function start() {
  const distCSSFilePath = path.resolve('dist/cloud-react.css');
  const distPackPath = path.resolve('dist/package.json');
  // const woffFile = fs.readFileSync(path.resolve('src/components/icon/fonts/iconfont.woff'))
  // const base64 = Buffer.from(woffFile, 'binary').toString('base64')
  // const _cssFile = fs.readFileSync(distCSSFilePath, 'utf-8').replace('url(\'./fonts/iconfont.woff\')', `url(data:font/woff;base64,${base64})`)
  // fs.writeFileSync(distCSSFilePath, _cssFile, 'utf-8')
  fs.writeFileSync(
    distPackPath,
    fs
      .readFileSync(distPackPath, 'utf-8')
      .replace('dist/cloud-react.js', 'cloud-react.js'),
    'utf-8',
  );
  fs.mkdirSync(path.resolve('dist/dist'));
  fs.writeFileSync(
    path.resolve('dist/dist/cloud-react.css'),
    distCSSFilePath,
    'utf-8',
  );

  const norContent = fs
    .readFileSync(path.join('src/components/style/core/normalize.less'))
    .toString()
    .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, '');
  const aniContent = fs
    .readFileSync(path.join('src/components/style/mixins/animation.less'))
    .toString()
    .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, '');
  const cloudContent = fs
    .readFileSync(path.resolve('dist/cloud-react.css'))
    .toString();
  fs.writeFileSync(
    path.resolve('dist/cloud-react.css'),
    norContent + aniContent + cloudContent,
    'utf-8',
  );
  const cloudContentMin = fs
    .readFileSync(path.resolve('dist/cloud-react.min.css'))
    .toString();
  const norContentMin = norContent
    .replace(/\n\n/g, '')
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/\s/g, '');
  const aniContentMin = aniContent
    .replace(/\n\n/g, '')
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/\s/g, '');
  fs.writeFileSync(
    path.resolve('dist/cloud-react.min.css'),
    norContentMin + aniContentMin + cloudContentMin,
    'utf-8',
  );
}

start();
