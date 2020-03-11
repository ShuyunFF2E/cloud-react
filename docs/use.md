---
category: 指南
title: 快速上手
order: 2
---

### 安装

使用`npm`或`yarn`安装

```bash
npm i cloud-react -S
```

```bash
yarn add cloud-react --save
```

如果你的网络环境不佳，推荐使用 `cnpm`。

### 示例

```js
import { Button } from 'cloud-react';
ReactDOM.render(<Button>按钮</Button>, mountNode);
```

#### 引入样式

```js
import 'cloud-react/cloud-react.css';
```

> 目前处于项目试用阶段，暂无按需引入方式，后续逐一添加
