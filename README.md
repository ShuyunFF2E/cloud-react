<h1 align="center">cloud-react</h1>

一套数云风格的 PC 端 React 组件库，服务于数云的的 PC 端 React 开发的产品中。

[![Build Status](https://travis-ci.org/ShuyunFF2E/cloud-react.svg?branch=master)](https://travis-ci.org/ShuyunFF2E/cloud-react)
[![npm version](https://img.shields.io/npm/v/cloud-react.svg?style=flat-square)](https://www.npmjs.com/package/cloud-react)
[![npm downloads](https://img.shields.io/npm/dt/cloud-react.svg?style=flat-square)](https://www.npmjs.com/package/cloud-react)

<h2 align="center">使用</h2>

### 安装

使用 `npm` 或 `yarn` 安装

```bash
npm i cloud-react -S
```

```bash
yarn add cloud-react --save
```

### 示例

```js
// 引入样式
import 'cloud-react/cloud-react.css';

// 引入单个组件
import { Button } from 'cloud-react';
ReactDOM.render(<Button>按钮</Button>, mountNode);
```

> 目前处于项目试用阶段，暂无按需引入方式，后续逐一添加

<h2 align="center">开发指南</h2>

### 分支命名管理

-   开发新功能，基于`master`新建分支，命名为`feature/**`，其中`*`为组件名称。
-   修复 bug，基于`master`新建分支，命名为`bugfix/**`，其中`*`为组件的名称。

### 开发新组件

1、新拉分支。  
2、执行`npm run new:component` 脚本，会在 src/components 目录生成一个`new-component`目录，里面包含新组件的基础文件和模版。  
3、将 _new-component_ 文件夹名称修改为对应的组件名称，相应的里面`NewComponent`组件名称也需要做修改。  
4、愉快的进行自己组件代码的编写。

### commit 提交信息

-   选用合适的[gitmoji](https://gitmoji.carloscuesta.me/)来表达本次的修改
-   组件名称
-   描述本次改动的内容

举个 🌰

`🐛[Button] 解决点击按钮失效问题`

### 提交`pull request`

-   使用当前分支与`develop`分支做比较，提交 pr，通知相关同学进行 review

### 发布版本

1、 先做代码 review  
2、 合并代码到 develop 分支，不删除源分支  
3、 发布测试版本用于项目上进行验证  
4、 有问题继续在源分支进行修复，重复 1 2 3 步骤  
5、 没有问题，发版同学提交 pr 到 master 分支  
6、 使用 rebase 的方式进行代码合并  
7、 发布正式版本

```javascript
npm version <version_category: major | minor | patch ｜ premajor｜ preminor ｜ prepatch ｜ prerelease>
```

### 执行后会自动运行以下操作:

-   检查当前代码是否 commit
-   执行测试脚本`npm run lint`
-   执行构建脚本`npm run build`, 版本号会根据参数进行递增。`major`: 主版本, `minor`: 次版本, `patch`: 补丁
-   执行发布脚本`npm publish dist`
-   执行提交代码脚本`git push && git push --tags`

<h2 align="center">贡献指南</h2>

1. 功能性开发：one component，one feature，one commit。
2. 修复 issue: one issue，one commit，便于代码 review 和出问题后追踪，撤销。
3. 开发一半要提交怎么办？直接`commit`，但是请不要`push`，等到完成开发完成之后`amend commit`。
4. 开发了一半，`commit`了，手贱也`push`了，怎么办？那么请了解一下`git rebase`合并下您的`commit`记录，然后`git push --force`了解下。谨记，这个只限于你自己的分支。不要在多个人同时使用的分支上使用`force push`。
5. 提交代码的时候`message`要足够清晰。
