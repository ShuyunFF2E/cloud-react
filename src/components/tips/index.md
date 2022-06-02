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

| 属性        | 说明                                                                                                  | 类型                     | 默认值    |
| ----------- | ----------------------------------------------------------------------------------------------------- | ------------------------ | --------- |
| style       | 设置最外层样式                                                                                        | CSSProperties            | {}        |
| className   | 设置最外层类样式                                                                                      | string                   | ''        |
| type        | 指定提示的类型主题，包括 `normal`、`warning`、`major`、`success`                                        | string                   | `normal`  |
| mode        | 指定提示的模式，包括 `default`、`banner`、`inline`                                                     | string                   | `default` |
| isShowIcon  | 是否显示指定类型的 icon                                                                               | boolean                  | `false`   |
| icon        | 自定义提示的 icon，默认 isShowIcon 为 true                                                            | string                   | ''        |
| msg         | 提示内容。为数组时逐行排列                                                                            | ReactNode、string、array | -         |
| description | 提示描述。为数组时逐行排列                                                                            | ReactNode、string、array | ''        |
| action      | 自定义操作项                                                                                          | ReactNode、string        | ''        |
| closable    | 提示是否可关闭                                                                                        | boolean                  | `false`   |
| closeText   | 自定义关闭按钮文字，默认 closable 为 true,优先级高于 closeIcon                                        | string                   | ''        |
| closeIcon   | 自定义关闭按钮 icon，默认 closable 为 true                                                            | string                   | ''        |
| onClose     | 关闭提示后触发回调                                                                                    | function                 | () => {}  |
| collapsible | 提示是否可收起展开。收起状态下：无描述时 msg 展示 4 行；有描述时 msg 展示 1 行、description 展示 4 行 | boolean                  | `false`   |

### 代码演示

<embed src="@components/tips/demos/type.md" />
<embed src="@components/tips/demos/icon.md" />
<embed src="@components/tips/demos/closable.md" />
<embed src="@components/tips/demos/description.md" />
<embed src="@components/tips/demos/action.md" />
<embed src="@components/tips/demos/collapse.md" />
<embed src="@components/tips/demos/banner.md" />
<embed src="@components/tips/demos/inline.md" />
