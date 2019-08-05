---
category: Components
title: DatePicker
subtitle: 日期选择框
---

### 何时使用
当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

### API
日期类组件包括以下三种形式。
- DatePicker
- RangePicker
- TimePicker


### DatePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 拓展组件样式的class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | number | - |
| value | 当前值 | number | - |
| format | 设置日期格式 | string | `yyyy/MM/dd` |
| open | 控制弹层是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | string | `请选择日期` |
| style | 拓展组件样式的style | object | - |
| showToday | 是否展示“今天”按钮 | boolean | `false` |
| showTimePicker | 是否展示时间选择器 | boolean | `false` |
| onChange | 选择日期改变 | Function(value: date) | - |
| onOK | 点击确定按钮 | Function(value: date) | - |

### RangePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 拓展组件样式的class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | [date,date] | - |
| value | 当前值 | [date,date] | - |
| format | 设置日期格式 | string | `yyyy/MM/dd` |
| open | 控制弹层是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | [string,string] | `[请选择开始时间, 请选择结束时间]` |
| style | 拓展组件样式的style | object | - |
| showToday | 是否展示“今天”按钮 | boolean | `false` |
| showTimePicker | 是否展示时间选择器 | boolean | `false` |
| onChange | 选择日期改变 | Function(value: date) | - |
| onOK | 点击确定按钮 | Function(value: date) | - |

### DatePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 拓展组件样式的class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | number | - |
| value | 当前值 | number | - |
| style | 拓展组件样式的style | object | - |
| onChange | 选择日期改变 | Function(value: object) | - |
| onBlur | 失去焦点时触发 | Function(value: object) | - |
