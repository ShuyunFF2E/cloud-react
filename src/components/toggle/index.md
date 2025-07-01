---
title: Toggle 开关
nav:
  title: Toggle 开关
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

互斥性的操作控件，用户可打开或关闭某个功

## API

| 属性           | 说明                              | 类型                                     | 默认值    |
| -------------- | --------------------------------- | ---------------------------------------- | --------- |
| checked        | 指定当前是否选中                  | boolean                                  | false     |
| disabled       | 是否禁用                          | boolean                                  | false     |
| size           | 开关大小，包括 `default`、`small` | string                                   | `default` |
| checkedText    | 选中时候的文案                    | string                                   | ''        |
| unCheckedText  | 未选中时候的文案                  | string                                   | ''        |
| onChange       | 切换状态时候的回调                | Function(checked: boolean, event: Event) | -         |
| onBeforeChange | 切换状态前的二次确认              | Function()                               | -         |

## 代码演示

### 基础类型
<embed src="@components/toggle/demos/basic-toggle.md" />

### 带文字开关
<embed src="@components/toggle/demos/text.md" />

### 受控组件
<embed src="@components/toggle/demos/change.md" />

### 不可用
<embed src="@components/toggle/demos/disabled.md" />

### 大小
<embed src="@components/toggle/demos/size.md" />

### 加载状态
<embed src="@components/toggle/demos/loading.md" />
