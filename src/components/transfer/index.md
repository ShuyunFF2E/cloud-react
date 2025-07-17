---
title: Transfer 穿梭框
nav:
  title: Transfer 穿梭框
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

数据选择

## API

### Transfer

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| data | Transfer 的数据源 | array[{ key, label, disabled }] | — | [ ] |
| value | 选中到右侧的数据 | array | - | [] |
| filterable | 是否可搜索 | boolean | — | false |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| propsAlias | 数据源的字段别名 | object{key, label, disabled} | — | — |
| leftDefaultChecked | 初始状态下左侧列表的已勾选项的 key 数组 | array | — | [ ] |
| rightDefaultChecked | 初始状态下右侧列表的已勾选项的 key 数组 | array | — | [ ] |
| style | 样式 | object | - | {} |
| simple | 是否极简模式 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |

### Events
| 事件名称      | 说明    | 类型       | 默认值 |
|---------- |-------- |---------- |---------|
| onChange | 右侧列表元素变化时触发 | function(value, direction, currentValue) direction:数据移动的方向（'left' / 'right'） | -      |

 ## 代码演示 


### 基础
<embed src="@components/transfer/demos/basic.md" /> 

### 可搜索
<embed src="@components/transfer/demos/searchable.md" />

### 有默认值
<embed src="@components/transfer/demos/defaultChecked.md" />

### 单项穿梭框
<embed src="@components/transfer/demos/oneWay.md" />

### 极简模式
<embed src="@components/transfer/demos/simple.md" />

### 不可用
<embed src="@components/transfer/demos/disabled.md" />
