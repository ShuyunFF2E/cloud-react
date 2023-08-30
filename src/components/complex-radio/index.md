---
title: ComplexRadio 复杂radio
nav:
  title: ComplexRadio 复杂radio
  path: /cloud-react
group:
  order: 22
  title: 数据
  path: /data
---

### 何时使用

带有标题或者图片的多选框

### API

#### ComplexRadio

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| content | 内容        | string ｜ number           | ''     |
| title | 标题        | string           | ''     |
| imgSrc        | 图片     | string           | ''     |
| checked        | 选中     | boolean           | false     |
| disabled        | 禁用     | boolean           | false     |
| type | 显示类型 | "card"\| "default" | "default"|
| value        | 当前 radio 对应的值     | any           | --     |
| textOverflowEllipsis        | content 超长显示 ...     | boolean           | false     |
| contentStyle        | content 样式，设置 textOverflowEllipsis 为 true 的时候，需要设置 content 的宽度    | object           | {}     |
| borderRadiusSize       | 圆角大小： `small`: 3px；`default`: 6px；`large`: 12px；         | string | `default`     |

 ### 代码演示 

<embed src="@components/complex-radio/demos/basic.md" /> 
