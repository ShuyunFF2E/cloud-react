---
title: InputNumber 数字输入框
nav:
  title: InputNumber 数字输入框
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

当需要获取标准数值时。

### API

| 属性         | 说明                                                      | 类型                                  | 默认值      |
| ------------ | --------------------------------------------------------- | ------------------------------------- | ----------- |
| disabled     | 组件失效状态                                              | boolean                               | `false`     |
| defaultValue | 初始值                                                    | number或string                      | -           |
| value        | 当前值                                                    | number或string                      | -           |
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
| onEnter      | 按下键盘回车按键的回调                                      | function(event)                          | -         |

 ### 代码演示 

<embed src="@components/input-number/demos/basic-input-number.md" /> 

<embed src="@components/input-number/demos/disabled.md" /> 

<embed src="@components/input-number/demos/precision.md" /> 

<embed src="@components/input-number/demos/size.md" /> 
