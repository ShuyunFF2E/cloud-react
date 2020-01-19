# ccms-components-react
数云平台版 react 组件库

[![Build Status](https://travis-ci.org/ShuyunFF2E/cloud-react.svg?branch=master)](https://travis-ci.org/ShuyunFF2E/cloud-react)
[![npm version](https://img.shields.io/npm/v/cloud-react.svg?style=flat-square)](https://www.npmjs.com/package/cloud-react)
[![npm downloads](https://img.shields.io/npm/dt/cloud-react.svg?style=flat-square)](https://www.npmjs.com/package/cloud-react)

## 开发新组件
1、基于`master`新建分支，分支命名为`feature/**`，其中`*`为当前组件的名称。  
2、执行`npm run new:component` 脚本，会在src/components目录生成一个`new-component`目录，里面包含新组件的基础文件和模版。  
3、将 *new-component* 文件夹名称修改为对应的组件名称，相应的里面`NewComponent`组件名称也需要做修改。  
4、愉快的进行自己组件代码的编写。  

## 发布脚本
```javascript
npm version <version_category: major | minor | patch>
```

### 执行后会自动运行以下操作:
- 检查当前代码是否commit
- 执行测试脚本`npm run lint`
- 执行构建脚本`npm run build`, 版本号会根据参数进行递增。`major`: 主版本, `minor`: 次版本, `patch`: 补丁
- 执行发布脚本`npm publish dist`
- 执行提交代码脚本`git push && git push --tags`

## 构建主页
```
npm run site
```

## 贡献指南
[点击查看贡献指南](https://github.com/ShuyunFF2E/ccms-components-react/blob/master/CONTRIBUTING.md)
