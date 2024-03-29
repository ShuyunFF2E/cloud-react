---
title: Modal 弹出框
nav:
  title: Modal 弹出框
  path: /cloud-react
group:
  order: 5
  title: 反馈
  path: /action
---

### 何时使用

封装了一个弹出框，响应用户点击行为，触发弹框及二次确认框，在弹出框进行相关业务处理。

### API

### Modal

| 属性               | 说明                                     | 类型                | 默认值  |
| ------------------ | ---------------------------------------- | ------------------- | ------- |
| visible            | 是否显示 modal 弹出框                    | boolean             | `false` |
| title              | 弹出框的标题                             | string              | `title` |
| showType           | iframe时，弹窗的透传模式，`top`, `current` | string              | `top`   |
| modalStyle         | 设置弹出框样式                           | object              | -       |
| bodyStyle          | 设置弹出框内容区域样式                   | object              | -       |
| disabledOk         | 禁用确认按钮                             | boolean             | `false` |
| className          | 设置弹出框样式名称                       | string              | -       |
| hasFooter          | 是否显示底部区域                         | boolean             | `true`  |
| footer             | modal 底部内容区域                       | string 或 ReactNode | -       |
| onClose            | 点击右上角关闭按钮时触发的回调           | function            | -       |
| onOk               | 点击确定按钮时触发的回调                 | function            | -       |
| onCancel           | 点击取消按钮时触发的回调                 | function            | -       |
| okText             | 确定按钮自定义文本                       | string              | `确定`  |
| cancelText         | 取消按钮自定义文本                       | string              | `取消`  |
| showMask           | 是否显示遮罩层                           | boolean             | `true`  |
| clickMaskCanClose  | 点击遮罩层是否关闭, showMask 必须为 true | boolean             | `true`  |
| showConfirmLoading | 点击确定是否显示 loading，用于异步关闭   | boolean             | `false` |

### Modal.createModal()

通过 createModal 创建弹框，通过 open 方式打开弹框，createModal 参数为一个 modal 实例；

### Modal method

包括：

-   Modal.confirm(config)
-   Modal.success(config)
-   Modal.error(config)
-   Modal.info(config)
-   Modal.warning(config)

以上均为函数，参数为 object，具体属性如下：
以上均为函数，`config`参数为`object`，具体属性如下：

| 方法名     | 说明                                          | 类型     | 默认值 |
| ---------- | --------------------------------------------- | -------- | ------ |
| isShowIcon | 是否显示提示信息前面的 icon                   | boolean  | `true` |
| icon       | 提示信息前面 icon, 即 icon 组件中的 type 名称 | string   | `--`   |
| iconStyle  | 提示信息前面 icon 的样式                      | object   | `--`   |
| showType   | iframe时，弹窗的透传模式，`top`, `current` | string  | `top`   |
| style      | 提示框的样式                                  | object   | `--`   |
| body       | 提示信息内容, 支持 jsx 语法直接传入 dom 节点  | any      | `--`   |
| okText             | 确定按钮自定义文本                       | string              | `确定`  |
| cancelText         | 取消按钮自定义文本                       | string              | `取消`  |
| onOk       | 确定按钮回调函数，仅`Modal.confirm()`函数支持 | function | `--`   |
| onClose    | 取消按钮回调函数                              | function | `--`   |

`Modal.confirm()`函数的`onOk`回调函数支持返回`false`阻止关闭弹框，或者返回一个`promise`延迟关闭，具体使用见示例：确认对话框 Demo

 ### 代码演示 

<embed src="@components/modal/demos/async.md" /> 

<embed src="@components/modal/demos/basic-modal.md" /> 

<embed src="@components/modal/demos/callback.md" /> 

<embed src="@components/modal/demos/component.md" /> 

<embed src="@components/modal/demos/confirm.md" /> 

<embed src="@components/modal/demos/conplex.md" /> 

<embed src="@components/modal/demos/defineInfoStyle.md" /> 

<embed src="@components/modal/demos/defineTpl.md" /> 

<embed src="@components/modal/demos/hasFooter.md" /> 

<embed src="@components/modal/demos/iframe.md" /> 

<embed src="@components/modal/demos/iframe-current.md" /> 

<embed src="@components/modal/demos/info.md" /> 

<embed src="@components/modal/demos/methodModal.md" /> 

<embed src="@components/modal/demos/nest.md" /> 

<embed src="@components/modal/demos/style.md" /> 
