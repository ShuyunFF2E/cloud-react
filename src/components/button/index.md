---
category: Components
title: Button
subtitle: 按钮
---

### 何时使用
按钮的作用是对用户的触发作出反应并执行相应的操作命令。

### 代码演示
<div id="code-demo"></div>

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 按钮失效状态 | boolean | `false` |
| href | 点击跳转的地址，设置此属性 `button` 的行为和 `a` 链接行为一致 | string | - |
| target | 设置 `a` 链接的 `target` 属性，`href` 存在时生效 | string | - |
| htmlType | 设置 `button` 原生属性 `type` | string | `button` |
| size | 设置按钮大小，可选值为 `large` `default` `small` 或者不设 | string | `default` |
| type | 设置按钮类型，可选值为 `primary` `dashed` `link` `normal` 或者不设 | string | `normal` |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | `false` |
| onClick | 点击触发的回调 | (event) => void | - |

### Button.Group
跟 `Button` 组件的一直，如果在 `Button.Group` 上设置了，则会覆盖掉子元素上设置的参数
