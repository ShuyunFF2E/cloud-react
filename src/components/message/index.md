---
title: Message 全局提示
nav:
  title: Message 全局提示
  path: /cloud-react
group:
  order: 5
  title: 反馈
  path: /action
---

### 何时使用

可提供成功和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

### API

| 属性    | 说明     | 类型   | 默认值            |
| ------- | -------- | ------ | ----------------- |
| msg     | 提示内容 | node   | -                 |
| options | 可选参数 | object | 参照 options 部分 |

### options

| 属性                    | 说明                                          | 类型        | 默认值        |
| ----------------------- | --------------------------------------------- | ----------- | ------------- |
| options.duration        | 自动关闭的延时，单位毫秒。设为 0 时不自动关闭 | number      | 3000          |
| option.contextContainer | 指定 message 挂载的 HTML 节点, 默认在 body 上 | HTMLElement | document.body |
| option.className        | 指定 message 节点上的 className               | string      | ''            |
| option.showClose        | 是否显示关闭 Icon                             | bool        | false         |
| option.showIcon         | 是否展示 Icon                                 | bool        | true          |
| option.isDeepen         | 是否使用重提示 UI                             | bool        | false         |
| option.onClose          | 手动关闭后的触发事件                          | func        | -             |
| option.borderRadiusSize | 圆角尺寸 `large` `small` `default`            |             | `default`     |

### message.method()

- message.success(msg, options)

- message.error(msg, options)

- message.warning(msg, options)

- message.info(msg, options)

### 代码演示

<embed src="@components/message/demos/basic-message.md" />

<embed src="@components/message/demos/basic-deepen-message.md" />

<embed src="@components/message/demos/basic-close-message.md" />

<embed src="@components/message/demos/basic-noicon-message.md" />

<embed src="@components/message/demos/contextContainer.md" />
