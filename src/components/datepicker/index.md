---
title: DatePicker 日期选择框（旧）
nav:
  title: DatePicker 日期选择框（旧）
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

### API

日期类组件包括以下 5 种形式。

-   DatePicker
-   TimePicker
-   YearPicker
-   YearMonthPicker
-   MonthDayPicker

### DatePicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| className         | 日历弹层 class                                     | string                  | -                 |
| disabled          | 组件失效状态                                       | boolean                 | `false`           |
| defaultValue      | 初始值                                             | Date/string                    | -                 |
| value             | 当前值(手动清空可绑定 state 置空)                  | Date/string                    | -                 |
| open              | 控制弹层首次是否展开                               | boolean                 | `false`           |
| placeholder       | 输入框默认提示                                     | string                  | `请选择日期`      |
| width             | 组件宽度                                           | string                  |                   | number | 230 |
| minDate           | 最小值                                             | Date/string                    | `可精确到时分秒`  |
| maxDate           | 最大值                                             | Date/string                    | `可精确到时分秒`  |
| minYear           | 最小年份                                           | number                  |                   |
| maxYear           | 最大年份                                           | number                  | -                 |
| showTimePicker    | 是否展示时间选择器                                 | boolean                 | `false`           |
| format            | 格式化输出格式                                     | string                  | `默认 yyyy/MM/DD` |
| defaultTime       | 显示默认打开时间(如设置 defaultValue 会覆盖)       | string                  | `00:00:00`        |
| onChange          | 选择日期改变                                       | Function(value: string) | -                 |
| containerEleClass | 需要滚动的元素 class 名称                          | string                  | -                 |
| isAppendToBody    | 日历选择弹框是否渲染在 body 上                     | boolean                 | `false`           |
| position          | 日历选择框是否启用自动定位，如需使用可设置为`auto` | string                  | -                 |
| canEdit           | 是否可编辑                                     | boolean                 | `false`           |

### TimePicker

| 属性         | 说明                         | 类型                    | 默认值  |
| ------------ | ---------------------------- | ----------------------- | ------- |
| className    | 日历弹层 class               | string                  | -       |
| disabled     | 组件失效状态                 | boolean                 | `false` |
| defaultValue | 初始值                       | string                  | -       |
| value        | 当前值(手动清空可绑定 state) | string                  | -       |
| onChange     | 选择日期改变                 | Function(value: object) | -       |
| onBlur       | 失去焦点时触发               | Function(evt)           | -       |
| canEdit      | 是否可编辑                   | boolean                 | `false`           |

### YearPicker

| 属性         | 说明                              | 类型                    | 默认值       |
| ------------ | --------------------------------- | ----------------------- | ------------ |
| className    | 日历弹层 class                    | string                  | -            |
| disabled     | 组件失效状态                      | boolean                 | `false`      |
| defaultValue | 初始值                            | number/string           | -            |
| value        | 当前值(手动清空可绑定 state 置空) | number/string           | -            |
| open         | 控制弹层首次是否展开              | boolean                 | `false`      |
| placeholder  | 输入框默认提示                    | string                  | `请选择日期` |
| min          | 最小值                            | number/string           | -            |
| max          | 最大值                            | number/string           | -            |
| onChange     | 选择年份改变                      | Function(value: string) | -            |
| canEdit      | 是否可编辑                   | boolean                 | `false`           |

### YearMonthPicker

| 属性         | 说明                              | 类型                    | 默认值         |
| ------------ | --------------------------------- | ----------------------- | -------------- |
| className    | 日历弹层 class                    | string                  | -              |
| disabled     | 组件失效状态                      | boolean                 | `false`        |
| defaultValue | 初始值                            | string           | -              |
| value        | 当前值(手动清空可绑定 state 置空) | string           | -              |
| open         | 控制弹层首次是否展开              | boolean                 | `false`        |
| placeholder  | 输入框默认提示                    | string                  | `请选择日期`   |
| min          | 最小值                            | string           | -              |
| max          | 最大值                            | string           | -              |
| format       | 格式化输出格式                    | string                  | `默认 YYYY/MM` |
| onChange     | 选择年月改变                      | Function(value: string) | -              |
| canEdit      | 是否可编辑                   | boolean                 | `false`           |

### MonthDayPicker

| 属性         | 说明                              | 类型                    | 默认值       |
| ------------ | --------------------------------- | ----------------------- | ------------ |
| className    | 日历弹层 class                    | string                  | -            |
| disabled     | 组件失效状态                      | boolean                 | `false`      |
| defaultValue | 初始值                            | string           | -            |
| value        | 当前值(手动清空可绑定 state 置空) | string           | -            |
| open         | 控制弹层首次是否展开              | boolean                 | `false`      |
| placeholder  | 输入框默认提示                    | string                  | `请选择日期` |
| min          | 最小值                            | string           | -            |
| max          | 最大值                            | string           | -            |
| format       | 格式化输出格式                    | string                  | `默认 MM/DD` |
| onChange     | 选择月日改变                      | Function(value: string) | -            |
| canEdit      | 是否可编辑                   | boolean                 | `false`           |

 ### 代码演示 

<embed src="@components/datepicker/demos/date-picker.md" /> 

<embed src="@components/datepicker/demos/disabled.md" /> 

<embed src="@components/datepicker/demos/modal.md" /> 

<embed src="@components/datepicker/demos/month-day-picker.md" /> 

<embed src="@components/datepicker/demos/range-date-picker.md" /> 

<embed src="@components/datepicker/demos/time-picker.md" /> 

<embed src="@components/datepicker/demos/year-month-picker.md" /> 

<embed src="@components/datepicker/demos/year-picker.md" /> 
