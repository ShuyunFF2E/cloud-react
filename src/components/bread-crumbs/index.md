---
title: BreadCrumbs 面包屑
nav:
  title: BreadCrumbs 面包屑
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

集合了组件库中所有的图标，通过 type 进行图标类型指定。

### API

| 属性        | 说明                 | 类型             | 默认值     |
| ----------- | -------------------- | ---------------- | ---------- |
| list  | 面包屑元素列表         | array            | `[]`        |
| onClick  | 点击事件               | function            |`item => {}`         |
| size     | 设置按钮大小，可选值为 `large` `default` `small` 或者不设          | string          | `default` |
| styles      | 样式             | object | `{}`          |
| split      | 分隔符             | string | /          |
| splitIcon      | 自定义分隔符图标             |   string | -          |

#### list
| 属性 | 说明 | 类型 | 默认值 |
| ----------- | -------------------- | ---------------- | ---------- |
| key | 唯一值,可用路由充当key值 | string | - |
| title | 显示文本 | string | - |
| icon | 图标 | string | - |
| iconTpl | 图标模板 | - | - |

 ### 代码演示 

### 基础用法
<embed src="@components/bread-crumbs/demos/basic-bread-crumbs.md" /> 

### 自定义分隔符
<embed src="@components/bread-crumbs/demos/custom.md" /> 
