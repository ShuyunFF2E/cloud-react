---
title: Checkbox 多选按钮
nav:
  title: Checkbox 多选按钮
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

定义一个或者一组 checkbox

### API

#### Checkbox

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| defaultChecked | 指定当前是否选中        | boolean           | --     |
| checked        | 当前是否选中(受控)      | boolean           | --     |
| disabled       | 是否禁用                | boolean           | false  |
| indeterminate  | 设置 indeterminate 状态 | boolean           | false  |
| value          | 当前 checkbox value     | string            | --     |
| checkboxStyle  | 复选框样式               | object            | {}     |
| textStyle      | 复选框后面的内容样式      | object            | {}     |
| onChange       | 变化时回调函数          | Function(e:Event) | --     |

#### Checkbox.Group

| 属性     | 说明                                             | 类型              | 默认值 |
| -------- | ------------------------------------------------ | ----------------- | ------ |
| value    | 选中项                                           | []                | --     |
| disabled | 整组禁用                                         | boolean           | --     |
| layout   | 定义 checkbox 横向布局(h: 横向布局; v: 竖向布局) | string            | 'h'    |
| onChange | 变化时回调函数                                   | Function(e:Event) | --     |

#### ComplexCheckbox

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| content | 内容        | string ｜ number           | ''     |
| title | 标题        | string           | ''     |
| imgSrc        | 图片     | string           | ''     |
| textOverflowEllipsis        | content 超长显示 ...     | boolean           | false     |
| contentStyle        | content 样式，设置 textOverflowEllipsis 为 true 的时候，需要设置 content 的宽度    | object           | {}     |
| type        |  显示类型    | "card"\| "default"           | "default"     |

 ### 代码演示 

### 基础 Checkbox
<embed src="@components/checkbox/demos/basic-checkbox.md" /> 

### 受控 Checkbox
<embed src="@components/checkbox/demos/controlled.md" /> 

### 复杂 CheckboxGroup
<embed src="@components/checkbox/demos/group.md" /> 

### 布局
<embed src="@components/checkbox/demos/layout.md" /> 

### 限制勾选数量
<embed src="@components/checkbox/demos/max.md" /> 

### 复杂 Checkbox
<embed src="@components/checkbox/complexDemos/basic.md" /> 

### 卡片式 Checkbox
<embed src="@components/checkbox/complexDemos/card.md" /> 
