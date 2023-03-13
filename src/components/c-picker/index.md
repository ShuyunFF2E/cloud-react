---
title: CPicker 日期选择框（新）
nav:
  title: CPicker 日期选择框（新）
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---


### 组件

日期类组件包括以下 8 种形式。

* `DatePicker` 日期选择
* `TimePicker` 时间选择
* `YearPicker` 年份选择
* `MonthPicker` 年月选择
* `WeekPicker` 周选择
* `RangePicker` 日期范围选择
* `TimeRangePicker` 时间范围选择
* ~~`YearMonthPicker`~~（原 `Datepicker` 中组件，`CPicker` 中由 `MonthPicker` 替代）
* ~~`MonthDayPicker`~~（原 `Datepicker` 中组件，`CPicker` 中删除，因为每月的天数与年份相关。若要实现类似需求，请参考下方【其他种类选择器】中的例子，直接传入不包含年份的 `format`，或使用级联选择器模拟）


### API

注意：
所有日期类的组件，默认接收**符合格式的字符串类型**， 如果 `value` 传入的是 `Date` 对象，所有涉及到暴露值的函数入参格式都将为 `Date` 对象。
时间类组件只支持字符串格式，请勿传 `Date` 对象。

#### 共同的 API

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| className         | 输入框弹层 className                                 | string                  | -                 |
| dropdownClassName | 日历弹层 className                                 | string                  | -                 |
| open              | 指示日历弹层打开状态（可用于使组件完全受控）                  | boolean                 | `false`           |
| size              | 输入框大小，可选值为`large` `default` ` small`，默认高度32px  | string                  | -                 |
| width             | 输入框宽度（兼容老版本，与原生 style 传值相同，新代码建议使用 style 属性即可）    | number / string        | -           |
| style             | 输入框样式                                        | CSSProperties                    | -                 |
| isAppendToBody    | 指示弹层是否渲染在body上（兼容老版本，新代码请使用 getPopupContainer 属性）           | boolean     | `true`        |
| getPopupContainer | 选择弹层渲染的节点                               | () => HTMLElement                 | `body`           |
| canEdit           | 指示是否可以直接在输入框中修改值                       | boolean                  | `true`      |
| showToday         | 指示是否显示『今天』按钮                             | boolean              | `false` |
| showNow           | 指示是否显示『此刻』按钮                             | boolean              | `false` |
| allowClear        | 指示是否可以清除值                              | boolean              | `false` |
| autoFocus         | 指示是否自动获得焦点                             | boolean              | `false` |
| minDate           | 最小值（除年份选择器外）                               | string / Date             | -  |
| maxDate           | 最大值（除年份选择器外）                               | string / Date             | -  |
| minYear           | 最小年份                                           | number                  |                   |
| maxYear           | 最大年份                                           | number                  | -                 |
| disabledDate      | 筛选不可选择的日期（设置此项将覆盖以上 4 个属性的作用）        | (date: string) => boolean     | -                 |
| showTimePicker    | 指示是否展示时间选择器,只在 `DatePicker` 或 `RangePicker` 中生效         | boolean                 | `false`           |
| renderExtraFooter | 渲染可选的额外选择框底部元素           | (mode: string) => React.ReactNode          | -  |
| onOpenChange      | 弹层打开状态改变事件处理函数 | (open: boolean) => void | - |
| onFocus           | 输入框获得焦点事件处理函数 | Function | - |
| onBlur            | 输入框失去焦点事件处理函数 | Function | - |
| onMouseDown       | 鼠标按下事件处理函数 | Function | - |
| onMouseUp         | 鼠标抬起事件处理函数 | Function | - |
| onMouseEnter      | 鼠标进入事件处理函数 | Function | - |
| onMouseLeave      | 鼠标离开事件处理函数 | Function | - |
| onClick           | 点击事件处理函数 | Function | - |
| onContextMenu     | 右键点击事件处理函数 | Function | - |
| onKeyDown         | 键盘按键按下事件处理函数 | Function | - |

#### DatePicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| format           | 格式化输出格式 | string | `"yyyy/MM/DD"` / `"yyyy/MM/DD HH:mm:ss"` |
| value            | 组件值 | string / Date | - |
| defaultValue     | 组件默认值 | string / Date | - |
| placeholder      | 输入框占位符 | string | `"请选择日期"` |
| disabled         | 指示组件是否可用 | boolean | `true` |
| defaultTime      | 时间选择框的默认值，当组件设置了 `showTimePicker` 时，此属性生效 | string | - |
| onChange         | 组件值改变事件处理函数 | (value: string / Date) => void | - |
| onSelect         | 弹层中选择事件处理函数 | (value: string / Date) => void | - |
| onOk             | 确定按钮点击事件处理函数 | (value: string / Date) => void | - |
| onPanelChange    | 弹层中日历切换事件处理函数 | (value: string / Date, type: string) => void | - |

#### TimePicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| format           | 格式化输出格式 | string | `"HH:mm:ss"` |
| value            | 组件值 | string | - |
| defaultValue     | 组件默认值 | string | - |
| placeholder      | 输入框占位符 | string | `"请选择时间"` |
| disabled         | 指示组件是否可用 | boolean | `true` |
| onChange         | 组件值改变事件处理函数 | (value: string) => void | - |
| onOk             | 确定按钮点击事件处理函数 | (value: string) => void | - |
| showHour         | 显示小时选择 | boolean | `true` |
| showMinute       | 显示分钟选择 | boolean | `true` |
| showSecond       | 显示秒选择 | boolean | `true` |

#### YearPicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| value            | 组件值 | number | - |
| defaultValue     | 组件默认值 | number | - |
| placeholder      | 输入框占位符 | string | `"请选择年份"` |
| disabled         | 指示组件是否可用 | boolean | `true` |
| min              | 最小年份（原 `minYear` 失效）                        | number                  |                   |
| max              | 最大年份（原 `maxYear` 失效）                        | number                  | -                 |
| onChange         | 组件值改变事件处理函数 | (value: number) => void | - |
| onSelect         | 弹层中选择事件处理函数 | (value: number) => void | - |
| onPanelChange    | 弹层中日历切换事件处理函数 | (value: number, type: string) => void | - |

#### MonthPicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| value            | 组件值 | string | - |
| defaultValue     | 组件默认值 | string | - |
| placeholder      | 输入框占位符 | string | `"请选择年月"` |
| disabled         | 指示组件是否可用 | boolean | `true` |
| minMonth         | 最小月份 | number | - |
| maxMonth         | 最大月份 | number | - |
| onChange         | 组件值改变事件处理函数 | (value: string) => void | - |
| onSelect         | 弹层中选择事件处理函数 | (value: string) => void | - |
| onPanelChange    | 弹层中日历切换事件处理函数 | (value: string, type: string) => void | - |

#### RangePicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| format           | 格式化输出格式 | string | `"yyyy/MM/DD"` / `"yyyy/MM/DD HH:mm:ss"` |
| value            | 组件值 | string[] / Date[] | - |
| defaultValue     | 组件默认值 | string[] / Date[] | - |
| placeholder      | 输入框占位符，可分开设置 | string / string[] | `"开始日期"` 和 `"结束日期"` |
| disabled         | 指示组件是否可用，可分开设置。当开始、结束其中一项不可用时，若要清楚组件值，需与 `allowEmpty` 配合使用 | boolean / boolean[] | `true` |
| allowEmpty       | 允许开始或结束为空，需分开设置 | boolean[] | `[false, false]` |
| defaultTime      | 时间选择框的默认值，当组件设置了 `showTimePicker` 时，此属性生效 | string | - |
| onChange         | 组件值改变事件处理函数 | (value: string[] / Date[]) => void | - |
| onOk             | 确定按钮点击事件处理函数 | (value: string[] / Date[]) => void | - |
| onPanelChange    | 弹层中日历切换事件处理函数 | (value: string[] / Date[], type: string[]) => void | - |

#### TimeRangePicker

| 属性              | 说明                                               | 类型                    | 默认值            |
| ----------------- | -------------------------------------------------- | ----------------------- | ----------------- |
| format           | 格式化输出格式 | string | `"HH:mm:ss"` |
| value            | 组件值 | string[] | - |
| defaultValue     | 组件默认值 | string[] | - |
| placeholder      | 输入框占位符，可分开设置 | string / string[] | `"开始时间"` 和 `"结束时间"` |
| disabled         | 指示组件是否可用，可分开设置。当开始、结束其中一项不可用时，若要清楚组件值，需与 `allowEmpty` 配合使用 | boolean / boolean[] | `true` |
| allowEmpty       | 允许开始或结束为空，需分开设置 | boolean[] | `[false, false]` |
| onChange         | 组件值改变事件处理函数 | (value: string[]) => void | - |
| onOk             | 确定按钮点击事件处理函数 | (value: string[]) => void | - |
| showHour         | 显示小时选择 | boolean | `true` |
| showMinute       | 显示分钟选择 | boolean | `true` |
| showSecond       | 显示秒选择 | boolean | `true` |

### 代码演示

#### 单个选择器
<embed src="@components/c-picker/demos/date-picker.md" />

#### 范围选择器
<embed src="@components/c-picker/demos/range-picker.md" />

#### 其他种类选择器
<embed src="@components/c-picker/demos/more-picker.md" />
