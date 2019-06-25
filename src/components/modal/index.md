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
| header | modal头部内容区域 | string或ReactNode | - |
| footer | modal底部内容区域| string或ReactNode | - |
| onClose | 点击取消按钮时触发的回调 | function | - |
| onOk | 点击确定按钮时触发的回调 | function | - |

#### info
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 自定义提示信息 | string或ReactNode | - |
| body | 自定义提示内容 | string或ReactNode | - |
| onClose | 点击取消按钮时触发的回调 | function | - |
| onOk | 点击确定按钮时触发的回调 | function | - |

### 如何使用
通过不同方法，传入对象相关属性
- modal弹出框：`<Modal visible={this.state.visible}>some content</Modal>`
- confirm确认框：`Modal.confirm({message: a message})`
- info提示框：`Modal.info({message: a info message})`
