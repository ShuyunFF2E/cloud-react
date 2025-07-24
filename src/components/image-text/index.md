---
title: ImageText 图文组合
nav:
  title: ImageText 图文组合
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

用于展示图片/图标与文本信息的组合，常用于列表项、选项等场景。

## API

| 属性             | 说明                       | 类型      | 默认值 |
| ---------------- | -------------------------- | --------- | ------ |
| imgSrc           | 图片地址                   | string    | -      |
| label            | 主要文本标题               | string    | -      |
| desc             | 描述文本                   | string    | -      |
| imgStyle         | 图片样式                   | object    | {}     |
| disabled         | 是否禁用状态               | boolean   | false  |
| icon             | 图标，与 imgSrc 二选一使用 | ReactNode | -      |
| searchValue      | 搜索关键词，用于高亮显示   | string    | -      |
| searchable       | 是否支持搜索               | boolean   | false  |
| supportLightText | 是否支持高亮文本显示       | boolean   | false  |
| lightTextColor   | 高亮文本颜色               | string    | -      |

## 代码演示

### 基础使用

<embed src="@components/image-text/demos/basic.md" />

### 带描述文本

<embed src="@components/image-text/demos/with-desc.md" />

### 禁用状态

<embed src="@components/image-text/demos/disabled.md" />

### 搜索高亮

<embed src="@components/image-text/demos/highlight.md" />

### 自定义图片样式

<embed src="@components/image-text/demos/custom-img.md" />

### 使用图标

<embed src="@components/image-text/demos/with-icon.md" />
