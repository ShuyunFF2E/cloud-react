---
title: Radio 单选按钮
nav:
  title: Radio 单选按钮
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

定义一组 radio

### API Radio.Group

| 属性         | 说明                    | 类型                       | 默认值 |
| ------------ | ----------------------- | -------------------------- | ------ |
| defaultValue | 默认 radio 选中的值     | any                        | --     |
| value        | 设置当前选中的值        | any                        | --     |
| onChange     | 选中 radio 的回调函数   | function(value, evt:Event) | --     |
| disabled     | 定义内部 radio 是否禁用 | boolean                    | false  |
| horizontal   | 定义 radio 横向布局     | boolean                    | false  |
| vertical     | 定义 radio 竖向布局     | boolean                    | false  |
| textStyle      | 复选框后面的内容样式      | object            | {}     |
| onChange       | 变化时回调函数          | Function(e:Event) | --     |

### API Radio

| 属性     | 说明                    | 类型    | 默认值 |
| -------- | ----------------------- | ------- | ------ |
| value    | 当前 radio 对应的值     | any     | --     |
| checked  | 指定当前 radio 是否选中 | boolean | false  |
| disabled | 是否禁用                | boolean | false  |

 ### 代码演示 

<embed src="@components/radio/demos/basic-radio.md" /> 

<embed src="@components/radio/demos/complex.md" /> 

<embed src="@components/radio/demos/disabled.md" /> 

<embed src="@components/radio/demos/group.md" /> 

<embed src="@components/radio/demos/layout.md" /> 
