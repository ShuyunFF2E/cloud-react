---
title: Select 下拉选择
nav:
  title: Select 下拉选择
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

## 何时使用

1. 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
2. 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## API
```html
<Select>
  <Option value="React">React</Option>
</Select>
```

## Props
### Select Props

| 属性              | 说明                                                                                                                                                 | 类型                                    | 默认值         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------- | 
| allowClear        | 是否支持一键清除                                                                                                                                     | boolean                                 | false          |
| multiple          | 是否为多选                                                                                                                                           | boolean                                 | false          |
| disabled          | 下拉禁用状态                                                                                                                                         | boolean                                 | false          |
| size              | 输入框大小，可选值为 `large` `default` `small`              | string            | `default` |
| dataSource        | 需要展示的数据，dataSource 和 children 同时存在时以 children 为准                                                                                    | array                                   | []             |
| labelKey          | 指定使用的 label 键值，仅在使用 dataSource 生成组件时生效                                                                                            | string                                  | 'label'        |
| valueKey          | 指定使用的 value 键值，仅在使用 dataSource 生成组件时生效                                                                                            | string                                  | 'value'        |
| descKey          | 指定次要信息的 value 键值，仅在使用 dataSource 生成组件时生效                                                                                            | string                                  | 'value'        |
| defaultOpen       | 默认下拉菜单展开状态                                                                                                                                 | boolean                                 | false          |
| open              | 下拉菜单展开状态，当使用此属性时组件本身 open 行为失效                                                                                               | boolean                                 | false             |
| placeholder       | 选择框默认文案                                                                                                                                       | string                                  | -              |
| searchable        | 支持搜索                                                                                                                                       | boolean                                 | false          |
| showTag           | 多选下拉已选项为tag形式，如果设置成 `false`，则已选项为逗号分隔的形式，超长展示省略号                                                                                                                      |  boolean                                 | true          |
| scrollSelected    | 设置 `scrollSelected` 为 `true`，则已选项超长可滚动                                                                                                                      |  boolean                                 | false          |
| scrollItem    | 设置 `scrollItem` 为 `true`，则下拉选项超长可滚动                                                                                                                      |  boolean                                 | false          |
| maxTagCount        | 多选下拉最多显示多少个tag                                                                                                                      | number                                 | 1          |
| maxHeight        | 多选下拉框最大高度        | number                                 | -          |
| searchPlaceholder | 搜索框默认文案                                                                                                                                       | string                                  | -              |
| emptyRender       | 数据为空时下拉框显示内容                                                                                                                             | string \| node                             | '暂无数据'+缺省图 |
| defaultValue      | 默认选中的项                                                                                                                                         | string \| number \| array                     | -              |
| value             | 选中的项                                                                                                                                             | string \| number \| array                     | -              |
| labelInValue      | 是否把每个选项的 label 包装到 value 中                                                                                                               | boolean                                 | false          |
| hasSelectAll      | 多选时是否有全选                                                                                                                                     | boolean                                 | false          |
| hasConfirmButton  | 多选时是否有确认按钮                                                                                                                                 | boolean                                 | false          |
| isSupportTitle    | 鼠标 hover 选项是否显示完整内容                                                                                                                      | boolean                                 | false          |
| okBtnText         | 多选时确认操作按钮文案                                                                                                                               | string                                  | '确认'         |
| cancelBtnText     | 多选时取消操作按钮文案                                                                                                                               | string                                  | '取消'         |
| className         | 组件的 className 属性                                                                                                                                | string                                  | -              |
| trigger           | 下拉触发方式，支持 click 和 hover                                                                                                                    | string                                  | 'click'        |
| showArrow         | 下拉 icon 是否显示                                                                                                                                   | boolean                                 | true           |
| showSelectStyle   | 选择器样式是否显示                                                                                                                                   | boolean                                 | true           |
| isAppendToBody    | 下拉框是否渲染在 body 上                                                                                                                             | boolean                                 | false          |     |
| position          | 下拉框定位：`top` `bottom` `auto`（是否启用自动定位，如需使用可设置为`auto`）                                                                                                       | string                                  | `bottom`              |
| onChange          | 选中 option 变化时回调此函数，普通单选树回调包含第三个参数返回当前点击选项的原始数据，如不使用 dataSource 生成组件，则需手动指定 option 的 item 属性 | function(value, oldValue)               | -              |
| onOk              | 多选时确认操作回调函数                                                                                                                               | function(value: array, oldValue: array) | -              |
| onCancel          | 多选时取消操作回调函数                                                                                                                               | function                                | -              |
| onSearch          | 搜索文本框变化时回调此函数                                                                                                                           | function(value: string)                 | -              |
| onSelectOpen      | 下拉选择框弹开的时候回调此函数                                                                                                                       | function                                | -              |
| onSelectClose     | 下拉选择框关闭的时候回调此函数                                                                                                                       | function                                | -              |
| onBeforeChange    | 确认选择值之前回调此函数，仅支持单选                                                                                                                 | function(value)                         | -              |
| confirmTemplate   | 自定义确认取消按钮模板(适用于多选下拉)                                                                                                               | function:({ onOk, onCancel })           | 组件默认模板   |
| supportLightText   | 是否支持搜索高亮关键字                                                                                                         |  boolean          | false   |
| lightTextColor   | 高亮关键字颜色                                                                                                         |  string          | #0055CC   |
| supportUnlimited   | 多选下拉是否支持不限                                                                                                         |   boolean          | false   |
| unlimitedLabel   | 修改"不限"文本                                                                                                         |  string          | 不限   |
| dropdownClassName   | 下拉框类名                                                                                                         |  string          | -   |
| dropdownStyle   | 下拉框样式                                                                                                       |  object          | {}   |
| selectAllText   | 全选文案                                                                                                       |   string          | '全选'   |
| borderRadiusSize  | 边框圆角 `default` `medium` `large`     | string | `default`         |
| optionRender  | 自定义下拉回填选项     | function | -        |
| checkboxStyle  | 多选框样式     | object | {}        |

### Option Props

| 属性      | 说明                                         | 类型          | 默认值 |
| --------- | -------------------------------------------- | ------------- | ------ |
| disabled  | 下拉禁用状态                                   | boolean       | false  |
| value     | 默认使用此属性进行基本操作，选中 option 的值       | string \| number | -      |
| item      | 当前选项的原始属性，包含 index 值                | object        | -      |
| className | 该项 option 的类名                             | string        | -      |
| type | type枚举类型： `divider`  表示分割线 | String | '' |

### ImageText Props

| 属性      | 说明                                         | 类型          | 默认值 |
| --------- | -------------------------------------------- | ------------- | ------ |
| imgSrc  | 图片地址                                   | string|ReactDom       | -  |
| imgStyle     | 图片样式       | object | {}      |
| label      | 下拉标题                | string        | -      |
| desc | 下拉描述                         | string        | -      |
| disabled | 下拉禁用状态 |  boolean | false |
| icon | 图标模板 |  ReactDom | - |

## 代码演示

### 基础使用
<embed src="@components/select/demos/basic.md" />

### 大小
<embed src="@components/select/demos/sizeSelect.md" />

### 可搜索
<embed src="@components/select/demos/searchable.md" />

### 分组
<embed src="@components/select/demos/group.md" />

### 分组 带分割线
<embed src="@components/select/demos/group2.md" />

### 分组可搜索
<embed src="@components/select/demos/groupSearch.md" />

### 自定义下拉选项
<embed src="@components/select/demos/imageText.md" />
<embed src="@components/select/demos/icon.md" />

[comment]: <> (### 带确认按钮)
[comment]: <> (<embed src="@components/select/demos/customConfirmBtn.md" />)

### 弹出位置
<embed src="@components/select/demos/position.md" />

### 全选
<embed src="@components/select/demos/selectAll.md" />

### 圆角
<embed src="@components/select/demos/borderRadius.md" />

### 定制化选项
<embed src="@components/select/demos/customItem.md" />

### 多选下拉支持不限
<embed src="@components/select/demos/unlimited.md" />

### 指定使用的键值
<embed src="@components/select/demos/key.md" />

### 超长
<embed src="@components/select/demos/ellipsis.md" />

### 触发方式
<embed src="@components/select/demos/trigger.md" />
