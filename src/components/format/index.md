---
title: Format 数据格式化
nav:
  title: Format 数据格式化
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

提供各种数据格式化模板，主要用于表格等数据的格式化显示，包括数字、文本、时间、链接等类型的格式化。

## 组件列表

| 组件 | 说明 | 主要功能 |
| ---- | ---- | -------- |
| NumberTpl | 数字格式化 | 支持千分位、小数位数、前缀后缀 |
| TextTpl | 文本格式化 | 支持多行显示、Tooltip提示 |
| TimeTpl | 时间格式化 | 支持自定义时间格式 |
| TimeRangeTpl | 时间范围格式化 | 支持开始和结束时间的格式化显示 |
| LinkTpl | 链接格式化 | 支持点击跳转、自定义点击事件 |

## API

### NumberTpl 数字格式化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 要格式化的数值 | `number \| string` | - |
| precision | 小数位数 | `number` | `0` |
| isThousands | 是否使用千分位格式 | `boolean` | `true` |
| prefix | 前缀 | `string` | `''` |
| suffix | 后缀 | `string` | `''` |

### TextTpl 文本格式化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 要显示的文本内容 | `number \| string` | - |
| line | 显示行数 | `number` | `1` |
| tooltipValue | 自定义tooltip内容 | `string` | - |

### TimeTpl 时间格式化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 时间值 | `string` | - |
| format | 时间格式（moment格式） | `string` | `''` |

### TimeRangeTpl 时间范围格式化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 行数据对象 | `object` | - |
| startKey | 开始时间字段名 | `string` | - |
| endKey | 结束时间字段名 | `string` | - |
| format | 时间格式（moment格式） | `string` | `''` |
| startValue | 开始时间值（优先级高于startKey） | `string` | `''` |
| endValue | 结束时间值（优先级高于endKey） | `string` | `''` |

### LinkTpl 链接格式化

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示的文本内容 | `string` | - |
| linkKey | 链接字段名 | `string` | - |
| row | 行数据对象 | `object` | `{}` |
| link | 链接地址（优先级高于linkKey） | `string` | `''` |
| onClick | 自定义点击事件 | `function` | - |
| line | 显示行数 | `number` | `1` |
| tooltipValue | 自定义tooltip内容 | `string` | - |

## 代码演示 

### 数字格式化
<embed src="@components/format/demos/number.md" />

### 文本格式化
<embed src="@components/format/demos/text.md" />

### 时间格式化
<embed src="@components/format/demos/time.md" />

### 时间范围格式化
<embed src="@components/format/demos/time-range.md" />

### 链接格式化
<embed src="@components/format/demos/link.md" />
