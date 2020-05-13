---
category: Components
title: DatePicker
subtitle: 日期选择框
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

| 属性              | 说明                                         | 类型                    | 默认值            |
| ----------------- | -------------------------------------------- | ----------------------- | ----------------- |
| className         | 日历弹层 class                               | string                  | -                 |
| disabled          | 组件失效状态                                 | boolean                 | `false`           |
| defaultValue      | 初始值                                       | Date                    | -                 |
| value             | 当前值(手动清空可绑定 state 置空)            | Date                    | -                 |
| open              | 控制弹层首次是否展开                         | boolean                 | `false`           |
| placeholder       | 输入框默认提示                               | string                  | `请选择日期`      |
| minDate           | 最小值                                       | Date                    | `可精确到时分秒`  |
| maxDate           | 最大值                                       | Date                    | `可精确到时分秒`  |
| minYear           | 最小年份                                     | Number                  |                   |
| maxYear           | 最大年份                                     | Number                  | -                 |
| showTimePicker    | 是否展示时间选择器                           | boolean                 | `false`           |
| format            | 格式化输出格式                               | string                  | `默认 YYYY/MM/DD` |
| defaultTime       | 显示默认打开时间(如设置 defaultValue 会覆盖) | string                  | `00:00:00`        |
| onChange          | 选择日期改变                                 | Function(value: string) | -                 |
| containerEleClass | 需要滚动的元素 class 名称                    | string                  | -                 |

### TimePicker

| 属性         | 说明                         | 类型                    | 默认值  |
| ------------ | ---------------------------- | ----------------------- | ------- |
| className    | 日历弹层 class               | string                  | -       |
| disabled     | 组件失效状态                 | boolean                 | `false` |
| defaultValue | 初始值                       | number                  | -       |
| value        | 当前值(手动清空可绑定 state) | number                  | -       |
| onChange     | 选择日期改变                 | Function(value: object) | -       |
| onBlur       | 失去焦点时触发               | Function(evt)           | -       |

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

### YearMonthPicker

| 属性         | 说明                              | 类型                    | 默认值         |
| ------------ | --------------------------------- | ----------------------- | -------------- |
| className    | 日历弹层 class                    | string                  | -              |
| disabled     | 组件失效状态                      | boolean                 | `false`        |
| defaultValue | 初始值                            | number/string           | -              |
| value        | 当前值(手动清空可绑定 state 置空) | number/string           | -              |
| open         | 控制弹层首次是否展开              | boolean                 | `false`        |
| placeholder  | 输入框默认提示                    | string                  | `请选择日期`   |
| min          | 最小值                            | number/string           | -              |
| max          | 最大值                            | number/string           | -              |
| format       | 格式化输出格式                    | string                  | `默认 YYYY/MM` |
| onChange     | 选择年月改变                      | Function(value: string) | -              |

### MonthDayPicker

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
| format       | 格式化输出格式                    | string                  | `默认 MM/DD` |
| onChange     | 选择月日改变                      | Function(value: string) | -            |
