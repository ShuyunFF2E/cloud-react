---
title: Avatar 头像
nav:
  title: Avatar 头像
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

### API

| 属性   | 说明                             | 类型             | 默认值    | 可选值                             |
| ------ | -------------------------------- | ---------------- | --------- | ---------------------------------- |
| alt    | 图像无法显示时的替代文本         | string           | user-fill |                                    |
| icon   | 设置头像的自定义图标             | ReactNode        | -         |                                    |
| group  | 设置头像组图标                   | boolean          | false     |                                    |
| shape  | 指定头像的形状                   | string           | circle    | `circle` `square`                  |
| size   | 头像的大小                       | string           | default   | `number` `large` `small` `default` |
| src    | 图片类头像的资源地址或者图片元素 | string ReactNode | -         |                                    |
| srcSet | 图片元素的原生 srcset 属性       | string           | -         |                                    |

### 基础

<embed src="@components/avatar/demos/basic-avatar.md" />

### 类型

<embed src="@components/avatar/demos/group-avatar.md" />
