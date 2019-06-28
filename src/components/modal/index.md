---
category: Components
title: Modal
subtitle: 弹出框
---

### 何时使用

封装了一个弹出框，响应用户点击行为，触发弹框及二次确认框，在弹出框进行相关业务处理。

### API

#### modal
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示modal弹出框 | boolean | false |
| title | 弹出框的标题 | string | title |
| hasFooter | 是否显示底部区域 | boolean | true |
| footer | modal底部内容区域| string或ReactNode | - |
| onClose | 点击右上角关闭按钮时触发的回调 | function | - |
| onOk | 点击确定按钮时触发的回调 | function | - |
| onCancel | 点击取消按钮时触发的回调 | function | - |
| okText | 确定按钮自定义文本 | string | 确定 |
| cancelText | 取消按钮自定义文本 | string | 取消 |
| showMask | 是否显示遮罩层 | boolean | true |
| clickMaskCanClose | 点击遮罩层是否关闭, showMask必须为true | boolean | false |
| showConfirmLoading | 点击确定是否显示loading，用于异步关闭 | boolean | false |


#### method
 - 默认属性：title(提示信息标题), body(提示信息内容), onOk(确定按钮回调函数，仅confirm支持), onClose(取消按钮回调函数)
 - confirm方法中的确定按钮回调函数支持返回promise，具体使用见示例demo。

| 方法名 | 说明 | 用法 | 示例 |
| --- | --- | --- | --- |
| confirm | 确认对话框 | Modal.confirm() | Modal.confirm({title: 'a confirm message', body: 'it is body'}) |
| success | 成功提示框 | Modal.info() | Modal.info({title: 'a info message', onClose: () => {}}) |
| error | 错误提示框 | Modal.error() | Modal.error({title: 'a error message'}) |
| info | 信息提示框 | Modal.info() | Modal.info({title: 'a info message'}) |
| warning | 警告提示框 | Modal.warning() | Modal.warning({title: 'a warning message'}) |
