---
category: Components
title: InputNumber
subtitle: 数字输入框
---

### 何时使用

当需要获取标准数值时。

### API

| 属性         | 说明                                                      | 类型                                  | 默认值      |
| ------------ | --------------------------------------------------------- | ------------------------------------- | ----------- |
| disabled     | 组件失效状态                                              | boolean                               | `false`     |
| defaultValue | 初始值                                                    | number                                | -           |
| value        | 当前值                                                    | number                                | -           |
| placeholder  | 输入框默认提示                                            | string                                | `请输入...` |
| min          | 最小值                                                    | number                                | `-Infinity` |
| max          | 最大值                                                    | number                                | `Infinity`  |
| size         | 设置组件大小，可选值为 `large` `default` `small` 或者不设 | string                                | `default`   |
| precision    | 精度                                                      | number                                | `undefined` |
| step         | 每次改变步数                                              | number                                | `1`         |
| noStep       | 不显示步数器                                              | bool                                  | `false`     |
| className    | 拓展组件样式的 class                                      | string                                | -           |
| style        | 拓展组件样式的 style                                      | object                                | -           |
| onChange     | 输入改变触发                                              | Function(value: number &#124; string) | -           |
| onBlur       | 移除焦点                                                  | Function(value: number &#124; string) | -           |
| onFocus      | 获取焦点                                                  | Function()                            | -           |
