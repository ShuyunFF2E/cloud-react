---
category: Components
title: Form
subtitle: 表单
---

### 何时使用
当你需要集体收集信息或者对控件做校验的时候。

### API

### Form

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| field | `new Field(this)`之后的实例，用到表单校验则时此项必填 | object | - |
| layout | 表单展示方向，可设置`horizontal` `vertical` `inline` | string | `vertical` |
| labelAlign | 标签的对齐位置，可设置`left` `right` | string | `right` |
| labelCol | `label` 标签布局，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | string | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol` | string | - |
| onSubmit | form内有`htmlType="submit"`的元素的时候会触发 | Function(evt:Event) | - |
| colon | 配合`label`属性使用，表示是否显示`label`后面的冒号 | boolean | `true` |
| className | Form 的 className 属性 | string | - |

如果Form和Form.Item相同的属性，Form.Item的优先级更高，如果Form上设置了就不用每一个Form.Item上都进行设置，更加方便

### Form.Item

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | `label` 标签的文本 | string|ReactNode | - |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | string|ReactNode | - |
| htmlFor | 设置子元素 `label` `htmlFor` 属性 | string | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | boolean | `false` |
| labelCol | `label` 标签布局，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` | string | - |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 `labelCol` | string | - |
| className | Form.Item 的 className 属性 | string | - |
