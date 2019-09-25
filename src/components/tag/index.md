---
category: Components
title: Tag
subtitle: 标签
---

### 何时使用
1. 用于标记事物的属性和维度；
2. 进行分类。

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签状态,可选状态值：success、warning、defaut、danger | string | nothing |
| closable | 标记标签是否可以被删除 | boolean | false |
| checkable | 标记标签是否可以被选中 | boolean | false |
| checked | 标记标签选中的状态 | boolean | false |
| disabled | 标签不可用 | boolean | false |
| onClick | 可选中的标签点击的回调函数, 回调函数的参数为当前标签的状态，选中为true,未选中为false | function | nothing |
| onClose | 标记标签被删除后被触发 | function | nothing |
