---
title: Popover 气泡
nav:
  title: Popover 气泡
  path: /cloud-react
group:
  order: 21
  title: 数据
  path: /data
---


### 何时使用

点击元素，弹出气泡确认框。

### API

#### Popover

| 属性           | 说明                    | 类型              | 默认值 |
| -------------- | ----------------------- | ----------------- | ------ |
| width | 宽度        | string ｜ number           | 245px / 245     |
| title | 标题        | string           | ''     |
| content        | 内容     | string           | ''     |
| showIcon       | 是否展示图标           | boolean           | false  |
| iconTpl  | 自定义图标 | Element           | ''  |
| showCancelBtn          | 是否展示取消按钮     | boolean           | false     |
| showConfirmBtn  | 是否展示确认按钮               | boolean            | false     |
| cancelBtnText      | 取消按钮自定义文本      | string            | '取消'     |
| confirmText      | 确认按钮自定义文本      | string            | '确认'     |
| onCancelClick      | 取消按钮回调      | function            | () => {}     |
| onConfirmClick      | 确认按钮回调      | function            | () => {}     |

 ### 代码演示 

<embed src="@components/popover/demos/basic.md" /> 

#### 支持配置 Tooltip 参数，详细请参考 Tooltip 说明文档


