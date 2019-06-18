---
category: Components
title: Modal
subtitle: 弹出框
---

### 何时使用

封装了一个弹出框，响应用户点击行为，触发弹框及二次确认框，在弹出框进行相关业务处理。

### 代码演示

<div id="code-demo"></div>

### API

#### modal(options)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示modal弹出框 | boolean | false |
|isConfirm | 是否是confirm | boolean | false |
| title | 弹出框的标题 | string | 标题 |
| style | modal自定义样式。注意,modal组件有默认 min-height 和 min-width,如果需要设置小于该值 | object | undefined |
| hasFooter | 是否有底部按钮 | boolean | false |
| body或__body | modal主体内容区域，值为模版的url | string | undefined |
| footer | modal底部内容区域，值为模版的url| string | undefined |
| header | modal头部内容区域，，值为模版的url | string | undefined |
| onClose | 点击弹框右上角关闭按钮时触发的回调 | function | undefined |
| onOk | 点击弹框确定按钮时触发的回调 | function | undefined |
| onCancel | 点击弹框取消按钮时触发的回调 | function | undefined |
| uid | 弹出框根节点绑定的 data-uid 属性的值,可以通过该特性做个性化弹框样式处理 | string | undefined |
