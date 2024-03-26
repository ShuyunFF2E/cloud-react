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

## 何时使用

通过鼠标或键盘，输入范围内的数值。

## API

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
| stepType    |  步数器类型                                               |  string                             | `topBottom/leftRight`   
| className    | 拓展组件样式的 class                                      | string                                | -           |
| style        | 拓展组件样式的 style                                      | object                                | -           |
| onChange     | 输入改变触发                                              | Function(value: number &#124; string) | -           |
| onBlur       | 移除焦点                                                  | Function(value: number &#124; string) | -           |
| onFocus      | 获取焦点                                                  | Function()                            | -           |
| onEnter      | 按下键盘回车按键的回调                                      | function(event)                          | -         |

 ## 代码演示 

### 基础使用
<embed src="@components/input-number/demos/basic-input-number.md" /> 

### 不可用
<embed src="@components/input-number/demos/disabled.md" /> 

### 精确度
<embed src="@components/input-number/demos/precision.md" /> 

### 大小
<embed src="@components/input-number/demos/size.md" /> 

### 左右布局
<embed src="@components/input-number/demos/step-type.md" />
