---
title: Toggle 开关
nav:
  title: Toggle 开关
  path: /cloud-react
group:
  order: 1
  title: 通用
  path: /common
---

### 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### API

| 属性           | 说明                              | 类型                                     | 默认值    |
| -------------- | --------------------------------- | ---------------------------------------- | --------- |
| checked        | 指定当前是否选中                  | boolean                                  | false     |
| disabled       | 是否禁用                          | boolean                                  | false     |
| size           | 开关大小，包括 `default`、`small` | string                                   | `default` |
| checkedText    | 选中时候的文案                    | string                                   | ''        |
| unCheckedText  | 未选中时候的文案                  | string                                   | ''        |
| onChange       | 切换状态时候的回调                | Function(checked: boolean, event: Event) | -         |
| onBeforeChange | 切换状态前的二次确认              | Function()                               | -         |

### 代码演示

<embed src="@components/toggle/demos/basic-toggle.md" />
<embed src="@components/toggle/demos/change.md" />
<embed src="@components/toggle/demos/disabled.md" />
<embed src="@components/toggle/demos/size.md" />
<embed src="@components/toggle/demos/text.md" />
