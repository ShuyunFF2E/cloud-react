const path = require('path');
const fs = require('fs');



function start() {
    const distCSSFilePath = path.resolve('dist/cloud-react.css')
    const distPackPath = path.resolve('dist/package.json')
    const woffFile = fs.readFileSync(path.resolve('src/components/icon/fonts/iconfont.woff'))
    const base64 = Buffer.from(woffFile, 'binary').toString('base64')
    const _cssFile = fs.readFileSync(distCSSFilePath, 'utf-8').replace('url(\'./fonts/iconfont.woff\')', `url(data:font/woff;base64,${base64})`)
    fs.writeFileSync(distCSSFilePath, _cssFile, 'utf-8')
    fs.writeFileSync(distPackPath, fs.readFileSync(distPackPath, 'utf-8').replace('dist/cloud-react.js', 'cloud-react.js'), 'utf-8')
    fs.mkdirSync(path.resolve('dist/dist'))
    fs.writeFileSync(path.resolve('dist/dist/cloud-react.css'), _cssFile, 'utf-8')

}


start()