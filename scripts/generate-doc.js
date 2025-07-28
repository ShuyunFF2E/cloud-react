const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const entryPath = path.resolve('src/components');

const categoryInfo = {
  nav: {
    order: 4,
    path: '/nav',
    name: '导航',
  },
  common: {
    order: 1,
    path: '/common',
    name: '通用',
  },
  data: {
    order: 3,
    path: '/data',
    name: '数据',
  },
  layout: {
    order: 2,
    path: '/layout',
    name: '布局',
  },
  action: {
    order: 5,
    path: '/action',
    name: '反馈',
  },
};

const categoryList = { // 各个组件类型
  'bread-crumbs': 'nav',
  button: 'common',
  checkbox: 'data',
  datepicker: 'data',
  field: 'data',
  form: 'data',
  icon: 'common',
  input: 'data',
  'input-number': 'data',
  'input-tag': 'data',
  loading: 'action',
  layout: 'layout',
  menu: 'nav',
  message: 'action',
  modal: 'action',
  pagination: 'nav',
  plaintext: 'data',
  radio: 'data',
  select: 'data',
  step: 'nav',
  table: 'data',
  'table-lite': 'data',
  'table-pagination': 'data',
  tabs: 'nav',
  tag: 'common',
  tips: 'common',
  toggle: 'common',
  tooltip: 'common',
  tree: 'data',
  'tree-select': 'data',
  upload: 'data',
};

/**
 * 1. 重命名markdown文件
 * 2. 修改javascript 为 jsx
 *
 */
function renameMarkdownName() {
  readFilesSync(entryPath, (fileName, dirPath) => {
    const filePath = path.join(dirPath, fileName);
    if (path.extname(filePath) === '.markdown') {
      const content = fs.readFileSync(filePath, 'utf-8');
      fs.writeFileSync(filePath, content.replace('```javascript', '```jsx'), { encoding: 'utf8' });
      let rename = filePath.replace('.markdown', '.md');
      if (path.basename(filePath) === 'basic.markdown') {
        rename = rename.replace('basic', `basic-${path.basename(dirPath.replace('/demos', ''))}`);
      }
      fs.renameSync(filePath, rename);
    }
  }, ['__test__']);
}

/**
 * 1. 修改各个组件index.md frontMatter结构为dumi格式
 * 2. 修改demo文件格式
 * 3. 引入demo
 */
function generateDocs() {
  readFilesSync(entryPath, (fileName, dirPath) => {
    const filePath = path.join(dirPath, fileName);
    if (path.extname(filePath) === '.md' && path.basename(filePath) === 'index.md') {
      const IdxMatter = matter(fs.readFileSync(filePath, 'utf-8'));
      const transMatter = transformDemoCodeMd(transformIdxFrontMatter(IdxMatter, path.basename(dirPath)), dirPath);
      fs.writeFileSync(filePath, matter.stringify(transMatter), { encoding: 'utf8' });
    }
  }, ['demos', '__test__']);
}

/**
 *
 * 读文件公共方法
 * @param {*} filePath 文件路径
 * @param {*} [callback=() => { }]
 * @param {*} [ignore=[]]
 */
function readFilesSync(filePath, callback = () => { }, ignore = []) {
  const files = fs.readdirSync(filePath);
  files.forEach(item => {
    const file = path.join(filePath, item);
    const stat = fs.statSync(file);
    if (stat.isDirectory() && ignore.indexOf(item) < 0) {
      readFilesSync(file, callback, ignore);
    } else if (stat.isFile()) {
      callback(item, filePath);
    }
  });
}

function transformIdxFrontMatter(IdxMatter, dirName) {
  const matterTemp = IdxMatter.data;
  if (categoryList[dirName] && !IdxMatter.data.group) {
    const _title = `${matterTemp.title} ${matterTemp.subtitle}`;
    const _group = categoryInfo[categoryList[dirName]];
    IdxMatter.data = {
      title: _title,
      nav: {
        title: _title,
        path: '/cloud-react',
      },
      group: {
        order: _group.order,
        title: _group.name,
        path: _group.path,
      },
    };
  }

  return IdxMatter;
}

function transformDemoCodeMd(IdxMatter, dirPath) { // 编译demo文档
  const demoFiles = fs.readdirSync(path.join(dirPath, 'demos'));
  const demoEmbeds = [];
  demoFiles.forEach(item => {
    const filePath = path.join(dirPath, 'demos', item);
    const demoMatter = matter(fs.readFileSync(filePath, 'utf-8'));
    if (demoMatter.content.indexOf('/**') < 0) {
      demoMatter.content = demoMatter.content.replace(/\```jsx/g, '```jsx\n' + `
            /**
             * title: ${demoMatter.data.title}
             * desc: ${demoMatter.data.desc}
             */`);
      demoMatter.content = demoMatter.content.split('```less')[0];
      demoEmbeds.push(`\n<embed src="@components/${path.basename(dirPath)}/demos/${item}" /> `);
      fs.writeFileSync(filePath, matter.stringify(demoMatter), { encoding: 'utf8' });
    }
  });
  if (IdxMatter.content.indexOf('代码演示') < 0) {
    IdxMatter.content += `\n ### 代码演示 \n${demoEmbeds.join('\n')}`;
  }

  return IdxMatter;
}

function start() {
  renameMarkdownName();
  generateDocs();
}

start();
