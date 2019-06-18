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
| scope | $rootScope modal需要继承的scope | $scope | $rootScope |
| title | 弹出框的标题 | string | 标题 |
| style | modal自定义样式。注意,modal组件有默认 min-height 和 min-width,如果需要设置小于该值 | object | undefined |
| fullscreen | 是否允许全屏 | boolean | false |
| hasFooter | 是否有底部按钮 | boolean | false |
| body | modal主体内容区域，值为模版的url | string | undefined |
| footer | modal底部内容区域，值为模版的url| string | undefined |
| header | modal头部内容区域，，值为模版的url | string | undefined |
| locals | 需要传递到modal控制器中的数据,以服务的方式注入 | object | undefined |
| controller | modal对应的控制器,当使用弹出框默认的footer时,可以通过覆写控制器的ok、cancel、close方法实现自有逻辑(不覆写则为关闭弹框的默认逻辑) | class或function | undefined |
| controllerAs | 控制器别名 | string | $ctrl |
| bindings | true时则从scope中复制数据,为object则直接从提供的这个对象中复制数据(浅复制) | object或boolean | undefined |
| onClose | 点击弹框右上角关闭按钮时触发的回调 | function | undefined |
| ok | 点击弹框确定按钮时触发的回调 | function | undefined |
| cancel | 点击弹框取消按钮时触发的回调 | function | undefined |
| uid | 弹出框根节点绑定的 data-uid 属性的值,可以通过该特性做个性化弹框样式处理 | string | undefined |

**返回值：`object` modal实例，具备result属性。result为一个promise，modal确认时会触发promise resolve，取消时触发promise reject。**

#### confirm(msg, onClose)

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| msg	| 二次确认信息,支持混入html模板 | string | undefined | 
| onClose | 点击右上角关闭按钮时触发的回调 | function | undefined |

**返回值：`object` 弹框实例，具备result属性。result为一个promise，modal确认时会触发promise resolve，取消时触发promise reject。**
