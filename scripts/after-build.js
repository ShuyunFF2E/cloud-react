const path = require('path');
const fs = require('fs');



function start() {
    const distCSSFilePath = path.resolve('dist/cloud-react.css')
    const distPackPath = path.resolve('dist/package.json')
    const woffFile = fs.readFileSync(path.resolve('src/components/icon/fonts/iconfont.woff'), 'utf-8')
    const base64 = Buffer.from(woffFile).toString('base64')
    fs.writeFileSync(distCSSFilePath, fs.readFileSync(distCSSFilePath, 'utf-8').replace('./fonts/iconfont.woff', `data:font/woff;base64,${base64}`), 'utf-8')
    fs.writeFileSync(distPackPath, fs.readFileSync(distPackPath, 'utf-8').replace('dist/cloud-react.js', 'cloud-react.js'), 'utf-8')
}


start()