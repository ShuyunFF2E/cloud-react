# Cloud React

[![npm package](https://img.shields.io/npm/v/cloud-react.svg?style=flat-square)](https://www.npmjs.org/package/cloud-react)
[![NPM downloads](https://img.shields.io/npm/dm/cloud-react.svg?style=flat-square)](https://npmjs.org/package/cloud-react)
[![GitHub license](https://img.shields.io/github/license/ShuyunFF2E/cloud-react.svg?style=flat-square)](https://github.com/ShuyunFF2E/cloud-react/blob/master/LICENSE)

数据赢家 React 组件库，提供丰富的企业级 UI 组件和解决方案。

## ✨ 特性

- **企业级设计** - 基于数据赢家设计规范，提供一致的用户体验
- **开箱即用** - 提供 50+ 高质量组件，覆盖常见业务场景
- **高性能** - 基于 React 16.8+ 构建，支持 Hooks
- 🎯 **TypeScript** - 完整的 TypeScript 支持
- **响应式** - 支持多种屏幕尺寸和设备
- 🎨 **主题定制** - 支持主题色和样式自定义
- 📖 **详细文档** - 提供完整的 API 文档和示例

## 📦 安装

```bash
npm install cloud-react --save
# 或
yarn add cloud-react
```

## 🔨 使用

### 引入样式

```js
// 引入完整样式
import 'cloud-react/cloud-react.css';
```

### 基础使用

```jsx
import React from 'react';
import { Button, Input, Modal } from 'cloud-react';

function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Input placeholder="请输入内容" />
      <Modal title="标题" visible={true}>
        内容
      </Modal>
    </div>
  );
}
```

### 框架依赖版本

- `react` >= `16.8.6`
- `react-dom` >= `16.8.6`
- `react-router-dom` >= `5.0.0`

<!-- ### 按需加载

```jsx
// 按需引入组件
import Button from 'cloud-react/lib/button';
import 'cloud-react/lib/button/style';
``` -->

## 🛠 开发

### 环境要求

- Node.js 16.20.0

### 安装依赖

```bash
npm install
```

### 开发调试

```bash
# 启动开发服务器，;并且在另一个控制台启动 watch 命令
npm start
npm run watch
```

### 构建

```bash
# 构建组件库
npm run build

# 构建文档
npm run docs:build
```

### 提交代码格式

> https://gitmoji.dev/

```bash
git commit -m "feat: [组件名称]提交内容"
git commit -m "fix: [组件名称]提交内容"
```

## 🎯 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge >= 79                                                                                                                                                                                                      | >= 59                                                                                                                                                                                                             | >= 56                                                                                                                                                                                                         | >= 12                                                                                                                                                                                                         |

## 🔗 相关链接

- [在线文档](https://cloud-react.shuyun.com/v1/cloud-react/common/button)
- [更新日志](https://github.com/ShuyunFF2E/cloud-react/blob/v1-master/docs/log.md)

## 🤝 贡献

我们欢迎所有形式的贡献，包括但不限于：

- Bug 报告
- 💡 新功能建议
- 📝 文档改进
- 代码贡献

### 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 🤝 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">
  <strong>Made with ❤️ by 数云前端团队</strong>
</div>
