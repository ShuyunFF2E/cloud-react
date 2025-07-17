---
title: Tag 标签
nav:
  title: Tag 标签
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

1. 用于标记事物的属性和维度；
2. 进行分类。

## API

| 属性     | 说明                                                   | 类型     | 默认值 |
| -------- | ------------------------------------------------------ | -------- | ------ |
| type     | 标签状态,可选值：success、warning、default、danger、link、 stroke （描边）、 fill-stroke （填充描边） | string   | -      |
| size     | 标签大小,可选值：normal、small、large                     | string   | normal      |
| rounded     | 圆形标签                  | bool   | false      |
| maxWidth  | 标签最大宽度，超过则显示省略号及Tooltip                    | number   | 200  |
| color     | 标签颜色,可选状态值：green、orange、red、blue、yellow、gray  | string   | -      |
| icon     | 图标类型，在tag内内置icon可直接传入icon类型              | string   | -      |
| closable | 标记标签是否可以被删除                                 | boolean  | false  |
| checkable | 是否可以被选中，仅适用默认类型                                  | boolean  | true  |
| disabled | 标签不可用                                             | boolean  | false  |
| onClick  | 点击标签的回调                                         | function | -      |
| onClose  | 标记标签被删除后被触发                                 | function | -      |

 ## 代码演示 

### 基础标签
<embed src="@components/tag/demos/basic.md" /> 

### 可删除标签
<embed src="@components/tag/demos/closeable.md" />

### 可选择标签
<embed src="@components/tag/demos/categories.md" /> 

### 预设状态标签
<embed src="@components/tag/demos/basic-tag.md" /> 

### 形状标签
<embed src="@components/tag/demos/round.md" /> 

### 多彩标签
<embed src="@components/tag/demos/color.md" /> 

### 禁用标签
<embed src="@components/tag/demos/disabled.md" /> 
