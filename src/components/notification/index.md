---
title: Notification 消息通知
nav:
    title: Notification 消息通知
    path: /cloud-react
group:
    order: 14
    title: 数据
    path: /action
---

### 何时使用
在系统四个角显示通知提醒信息。经常用于以下情况：
- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。


### API

#### Drawer 基础配置项

| 属性           | 说明                    | 类型              | 默认值 
| -------------- | ---------------------- | ----------------- | ------ |
| placement       | `top-left` `top-right` `bottom-left` `bottom-right`     | string | `top-left`     |
| container       | 指定 notification 挂载的 HTML 节点, 默认在 body 上     | HTMLElement | -     |
| duration |  自动关闭的延时，单位毫秒。设为 0 时不自动关闭  |  number  |   4500  | |
| title |  标题  |  ReactNode  |   -  | |
| content |  内容  |  ReactNode  |   -  | |
| showCloseIcon |  是否展示右上角关闭图标  |  ReactNode  |   -  | |
| btn |  自定义右下角按钮  |  ReactNode  |   -  | |
| className |  自定义类名  |  string  |   -  | |
| borderRadiusSize       | 圆角大小： `small`: 3px；`default`: 6px；`large`: 12px；         | string | `default`     |
| showIcon       | 是否展示图标         |  bool | false     |
| IconType       | 图标类型 `info` `success` `warn` `fail`       |  string | `info`  |  
| icon       | 自定义图标        |  ReactNode |  - |  
| showCancelBtn       | 是否展示取消按钮        |  bool |  false |  
| showConfirmBtn       | 是否展示确定按钮        |  bool |  false |  
| showDetailBtn     | 是否展示详情按钮        |  bool |  false |  
| cancelBtnText     | 取消按钮文案        |  string |  - |  
| confirmBtnText     | 确定按钮文案        |  string |  - |  
| detailBtnText     | 详情按钮文案        |  string |  - |  
| onConfirm     | 点击确定回调        |  function |  - |  
| onClose     | 关闭回调        |  function |  - |  
| onDetailClick     | 查看详情回调        |  function |  - |  


### 代码演示

### 基础用法

<embed src="@components/notification/demos/basic.md" />
<embed src="@components/notification/demos/placement.md" />
