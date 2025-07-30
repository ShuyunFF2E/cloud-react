---
title: Slider 滑动输入条
nav:
  title: Slider 滑动输入条
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值

## API

### 通用属性（Slider 和 Range 共用）

| 属性             | 说明                                                                                                                       | 类型                                                  | 默认值           |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------------- |
| className        | 根 DOM 节点的附加 CSS 类                                                                                                   | string                                                | `''`             |
| min              | 滑动条的最小值                                                                                                             | number                                                | `0`              |
| max              | 滑动条的最大值                                                                                                             | number                                                | `100`            |
| id               | 组件的唯一标识符，用于无障碍访问                                                                                           | string                                                | `''`             |
| marks            | 滑动条上的标记点。键为位置，值为显示内容。若需自定义样式，值需包含 `style` 和 `label` 属性的对象                           | `{number: ReactNode}` 或 `{number: { style, label }}` | `{}`             |
| step             | 滑动条每次增减的步长。必须大于 0，且 `max - min` 需能被 `step` 整除。当 `marks` 非空时，可设为 `null` 以使用标记点作为步长 | number 或 null                                        | `1`              |
| vertical         | 是否垂直展示滑动条                                                                                                         | boolean                                               | `false`          |
| handle           | 自定义滑块手柄的生成函数                                                                                                   | `(props) => React.ReactNode`                          | -                |
| included         | 是否为连续值区间（`true` 表示连续，`false` 表示独立值）                                                                    | boolean                                               | `true`           |
| reverse          | 是否反向渲染组件                                                                                                           | boolean                                               | `false`          |
| disabled         | 是否禁用滑动条（手柄不可移动）                                                                                             | boolean                                               | `false`          |
| keyboard         | 是否支持键盘移动手柄                                                                                                       | boolean                                               | `true`           |
| dots             | 当 `step > 1` 时，是否显示刻度点                                                                                           | boolean                                               | `false`          |
| onBeforeChange   | 当 `ontouchstart` 或 `onmousedown` 触发时的回调函数                                                                        | Function                                              | `NOOP`（无操作） |
| onChange         | 滑动条值变化时的回调函数                                                                                                   | Function                                              | `NOOP`           |
| onChangeComplete | 当 `ontouchend` 或 `onmouseup` 触发时的回调函数                                                                            | Function                                              | `NOOP`           |
| handleStyle      | 手柄的样式（Slider 为 Object，Range 为 Object 数组）                                                                       | `Array[Object]` 或 `Object`                           | `[{}]`           |
| trackStyle       | 轨道的样式（Slider 为 Object，Range 为 Object 数组）                                                                       | `Array[Object]` 或 `Object`                           | `[{}]`           |
| railStyle        | 基础轨道的样式                                                                                                             | Object                                                | `{}`             |
| dotStyle         | 刻度点的样式（可接受函数动态设置）                                                                                         | `Object` 或 `(dotValue) => Object`                    | `{}`             |
| activeDotStyle   | 活动刻度点的样式（可接受函数动态设置）                                                                                     | `Object` 或 `(dotValue) => Object`                    | `{}`             |

---

### Slider 独有属性

| 属性                            | 说明                                          | 类型                | 默认值      |
| ------------------------------- | --------------------------------------------- | ------------------- | ----------- |
| defaultValue                    | 滑动条的初始值                                | number              | `0`         |
| value                           | 滑动条的当前值                                | number              | -           |
| startPoint                      | 轨道的起始值（若未设置，使用 `min`）          | number              | `undefined` |
| tabIndex                        | 手柄的 `tabIndex` 属性值                      | number              | `0`         |
| ariaLabelForHandle              | 手柄的 `aria-label` 无障碍标签                | string              | -           |
| ariaLabelledByForHandle         | 手柄的 `aria-labelledby` 属性（关联标签元素） | string              | -           |
| ariaRequired                    | 手柄的 `aria-required` 属性（标记是否必填）   | boolean             | -           |
| ariaValueTextFormatterForHandle | 自定义手柄 `aria-valuetext` 值的格式化函数    | `(value) => string` | -           |

---

### Range 独有属性

| 属性                                  | 说明                                            | 类型                       | 默认值   |
| ------------------------------------- | ----------------------------------------------- | -------------------------- | -------- |
| defaultValue                          | 多个手柄的初始位置                              | number[]                   | `[0, 0]` |
| value                                 | 多个手柄的当前位置                              | number[]                   | -        |
| tabIndex                              | 各手柄的 `tabIndex` 属性值                      | number[]                   | `[0, 0]` |
| ariaLabelGroupForHandles              | 各手柄的 `aria-label` 无障碍标签                | Array[string]              | -        |
| ariaLabelledByGroupForHandles         | 各手柄的 `aria-labelledby` 属性（关联标签元素） | Array[string]              | -        |
| ariaValueTextFormatterGroupForHandles | 各手柄的 `aria-valuetext` 格式化函数            | Array[`(value) => string`] | -        |
| count                                 | 渲染的轨道数量（手柄数量为 `count + 1`）        | number                     | `1`      |
| allowCross                            | 是否允许手柄交叉                                | boolean                    | `true`   |
| pushable                              | 是否允许推动相邻手柄。设为数字时表示最小间距    | boolean 或 number          | `false`  |
| draggableTrack                        | 是否开启轨道拖拽（开启后点击轨道拖拽无效）      | boolean                    | `false`  |

## 代码演示

### 基础

<embed src="@components/slider/demos/basic.md" />

### 区间

<embed src="@components/slider/demos/range.md" />
