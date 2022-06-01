---
title: Tips 提示信息
nav:
  title: Tips 提示信息
  path: /cloud-react
group:
  order: 1
  title: 通用
  path: /common
---

### 何时使用

当某个页面需要向用户显示警告的信息时，非浮层的静态展现形式，始终展现，不会自动消失。

### API

| 属性       | 说明                                                | 类型              | 默认值 |
| ---------- | --------------------------------------------------- | ----------------- | ------ |
| msg        | 提示内容                                            | ReactNode、string | -      |
| type       | 指定提示的样式,包括 normal、warning、major、success | string            | normal |
| isShowIcon | 是否显示指定类型的 icon                             | boolean           | false  |
| style      | 样式                                                | CSSProperties     | -      |

### 代码演示

<embed src="@components/tips/demos/type.md" />
<embed src="@components/tips/demos/icon.md" />
<embed src="@components/tips/demos/closable.md" />
<embed src="@components/tips/demos/description.md" />
<embed src="@components/tips/demos/action.md" />
<embed src="@components/tips/demos/collapse.md" />
<embed src="@components/tips/demos/banner.md" />
<embed src="@components/tips/demos/inline.md" />
