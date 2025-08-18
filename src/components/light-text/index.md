---
title: LightText 文本高亮
nav:
  title: LightText 文本高亮
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

用于在文本中高亮显示搜索关键词，常用于搜索结果、选项列表等场景。

## API

| 属性          | 说明                       | 类型    | 默认值    |
| ------------- | -------------------------- | ------- | --------- |
| originText    | 原始文本内容               | any     | -         |
| keyWords      | 需要高亮的关键词           | any     | ''        |
| defaultSymbol | 默认符号，当没有内容时显示 | string  | ''        |
| isFullMatch   | 是否完全匹配               | boolean | false     |
| cursor        | 鼠标悬停时的光标样式       | string  | 'auto'    |
| color         | 高亮文本颜色               | string  | '#0055CC' |

## 代码演示

### 基础使用

<embed src="@components/light-text/demos/basic.md" />

### 部分匹配

<embed src="@components/light-text/demos/partial-match.md" />

### 完全匹配

<embed src="@components/light-text/demos/full-match.md" />

### 自定义颜色

<embed src="@components/light-text/demos/custom-color.md" />

### 特殊字符处理

<embed src="@components/light-text/demos/special-chars.md" />

### 在列表中使用

<embed src="@components/light-text/demos/in-list.md" />
