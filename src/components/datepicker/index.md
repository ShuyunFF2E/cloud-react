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
- YearPicker
- YearMonthPicker
- MonthDayPicker

### DatePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 日历弹层class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | Date | - |
| value | 当前值 | Date | - |
| open | 控制弹层首次是否展开 | boolean | `false` |``
| placeholder | 输入框默认提示 | string | `请选择日期` |
| position | 弹层位置 AUTO/UP/DOWN | string | `AUTO` |
| minDate | 最小值 | Date | - |
| maxDate | 最大值 | Date | - |
| showToday | 是否展示“今天”按钮 | boolean | `false` |
| showNow | 是否展示“此刻”按钮 | boolean | `false` |
| showTimePicker | 是否展示时间选择器 | boolean | `false` |
| onChange | 选择日期改变 | Function(value: string) | - |

### TimePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 日历弹层class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | number | - |
| value | 当前值 | number | - |
| onChange | 选择日期改变 | Function(value: object) | - |
| onBlur | 失去焦点时触发 | Function(evt) | - |

### RangePicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 拓展组件样式的class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | [date,date] | - |
| value | 当前值 | [date,date] | - |
| open | 控制弹层是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | [string,string] | `[请选择开始时间, 请选择结束时间]` |
| position | 弹层位置 AUTO/UP/DOWN | string | `AUTO` |
| minDate | 最小值 | Date | - |
| maxDate | 最大值 | Date | - |
| onChange | 选择日期改变 | Function(value: [string,string], value2: [date,date]) | - |


### YearPicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 日历弹层class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | numben/string | - |
| value | 当前值 | numben/string | - |
| open | 控制弹层首次是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | string | `请选择日期` |
| position | 弹层位置 AUTO/UP/DOWN | string | `AUTO` |
| min | 最小值 | numben/string | - |
| max | 最大值 | numben/string | - |
| showThisYear | 是否展示“今年”按钮 | boolean | `false` |
| onChange | 选择年份改变 | Function(value: string) | - |

### YearMonthPicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 日历弹层class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | numben/string | - |
| value | 当前值 | numben/string | - |
| open | 控制弹层首次是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | string | `请选择日期` |
| position | 弹层位置 AUTO/UP/DOWN | string | `AUTO` |
| min | 最小值 | numben/string | - |
| max | 最大值 | numben/string | - |
| showThisMonth | 是否展示“当月”按钮 | boolean | `false` |
| onChange | 选择年月改变 | Function(value: string) | - |

### MonthDayPicker
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 组件唯一标识，一个页面引用多个同种类型组件时需要设置 | string | - |
| className | 日历弹层class | string | - |
| disabled | 组件失效状态 | boolean | `false` |
| defaultValue | 初始值 | numben/string | - |
| value | 当前值 | numben/string | - |
| open | 控制弹层首次是否展开 | boolean | `false` |
| placeholder | 输入框默认提示 | string | `请选择日期` |
| position | 弹层位置 AUTO/UP/DOWN | string | `AUTO` |
| min | 最小值 | numben/string | - |
| max | 最大值 | numben/string | - |
| showToday | 是否展示“今天”按钮 | boolean | `false` |
| onChange | 选择月日改变 | Function(value: string) | - |
