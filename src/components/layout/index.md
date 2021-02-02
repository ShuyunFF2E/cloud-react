---
category: Components
title: Layout
subtitle: 布局组件
---

### 何时使用

页面整体布局的时候使用。


### 组件概述
Layout：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。  

Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。  

Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。  

Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。  

Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。  

### API

| 属性       | 说明             | 类型    | 默认值  |
| ---------- | ---------------- | ------- | ------- |
| hasSider       | 只在Layout上使用，配置是否有侧边栏         | boolean  | false |
