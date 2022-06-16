---
title: Transfer 穿梭框
nav:
  title: Transfer 穿梭框
  path: /cloud-react
group:
  order: 26
  title: 数据
  path: /data
---

### 何时使用

数据选择

### API

#### Transfer

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| data | Transfer 的数据源 | array[{ id, name }] | — | [ ] |
| value | 选中到右侧的数据 | array | - | [] |
| filterable | 是否可搜索 | boolean | — | false |
| titles | 自定义列表标题 | array | — | ['列表 1', '列表 2'] |
| leftDefaultChecked | 初始状态下左侧列表的已勾选项的 key 数组 | array | — | [ ] |
| rightDefaultChecked | 初始状态下右侧列表的已勾选项的 key 数组 | array | — | [ ] |
| style | 样式 | object | - | {} |

内部使用树形组件 `<Tree>`，数据源属性详见 [Tree](./tree)

### Events
| 事件名称      | 说明    | 类型       | 默认值 |
|---------- |-------- |---------- |---------|
| onChange | 右侧列表元素变化时触发 | function(value, direction, currentValue) direction:数据移动的方向（'left' / 'right'） | -      |

 ### 代码演示 

<embed src="@components/transfer/demos/basic.md" />
<embed src="@components/transfer/demos/searchable.md" />
<embed src="@components/transfer/demos/defaultChecked.md" />
<embed src="@components/transfer/demos/tree.md" />
<!-- <embed src="@components/transfer/demos/own.md" /> -->
