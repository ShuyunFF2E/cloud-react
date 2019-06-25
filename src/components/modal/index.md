---
category: Components
title: Modal
subtitle: 弹出框
---

### 何时使用

封装了一个弹出框，响应用户点击行为，触发弹框及二次确认框，在弹出框进行相关业务处理。

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示modal弹出框 | boolean | false |
| title | 弹出框的标题 | string | 默认弹出框 |
| hasFooter | 是否有底部按钮 | boolean | true |
| header | modal头部内容区域 | string或ReactComponent | 空 |
| body | modal主体内容区域 | string或ReactComponent | some content you can write here |
| footer | modal底部内容区域| string或ReactComponent | 空 |
| onClose | 点击弹框右上角关闭按钮时触发的回调 | function | 空 |
| onOk | 点击弹框确定按钮时触发的回调 | function | 空 |
| onCancel | 点击弹框取消按钮时触发的回调 | function | 空 |
| message | confirm或info的提示信息 | string | this is a message |

### 如何使用
通过不同方法，传入对象相关属性
- modal弹出框：Modal.modal({visible: true})
- confirm确认框：Modal.confirm({visible: true})
- info信息提示框：Modal.info({visible: true})
