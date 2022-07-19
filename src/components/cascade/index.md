---
title: cascade 级联选择
nav:
  title: cascade 级联选择
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

展示一个多级卡片式菜单给用户选择，用来代替原生的选择器。

### API

### cascade

| 属性              | 说明                                                              | 类型                                    | 默认值         |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- | -------------- |
| allowClear        | 是否支持一键清除                                                  | boolean                                 | false          |
| multiple          | 是否为多选                                                        | boolean                                 | false          |
| disabled          | 下拉禁用状态                                                      | boolean                                 | false          |
| dataSource        | 需要展示的数据，dataSource 和 children 同时存在时以 children 为准 | array                                   | []             |
| labelKey          | 指定使用的 label 键值，仅在使用 dataSource 生成组件时生效         | string                                  | 'label'        |
| valueKey          | 指定使用的 value 键值，仅在使用 dataSource 生成组件时生效         | string                                  | 'value'        |
| defaultOpen       | 默认下拉菜单展开状态                                              | boolean                                 | false          |
| open              | 下拉菜单展开状态，当使用此属性时组件本身 open 行为失效            | boolean                                 | -              |
| placeholder       | 选择框默认文案                                                    | string                                  | -              |
| searchable        | 使下拉框带搜索                                                    | boolean                                 | false          |
| searchPlaceholder | 搜索框默认文案                                                    | string                                  | -              |
| emptyRender       | 数据为空时下拉框显示内容                                          | string\node                             | '暂时没有数据' |
| defaultValue      | 默认选中的项                                                      | string\number\array                     | -              |
| value             | 选中的项                                                          | string\number\array                     | -              |
| labelInValue      | 是否把每个选项的 label 包装到 value 中                            | boolean                                 | false          |
| hasSelectAll      | 多选时是否有全选                                                  | boolean                                 | false          |
| showSelectAll     | 全选时是否显示为“全选”                                                  | boolean                            | false          |
| hasConfirmButton  | 多选时是否有确认按钮                                              | boolean                                 | false          |
| isSupportTitle       | 鼠标 hover 选项是否显示完整内容                                              | boolean                                 | false          |
| okBtnText         | 多选时确认操作按钮文案                                            | string                                  | '确认'         |
| cancelBtnText     | 多选时取消操作按钮文案                                            | string                                  | '取消'         |
| className         | 组件的 className 属性                                             | string                                  | -              |
| trigger           | 下拉触发方式，支持 click 和 hover                                 | string                                  | 'click'        |
| showArrow         | 下拉 icon 是否显示                                                | boolean                                 | true           |
| showSelectStyle   | 选择器样式是否显示                                                | boolean                                 | true           |
| isAppendToBody    | 下拉框是否渲染在 body 上                                          | boolean                                 | false          |  |
| position          | 下拉框是否启用自动定位，如需使用可设置为`auto`                    | string                                  | -              |
| onChange          | 选中 option 变化时回调此函数，普通单选树回调包含第三个参数返回当前点击选项的原始数据，如不使用dataSource生成组件，则需手动指定option的item属性   | function(value, oldValue)               | -              |
| onOk              | 多选时确认操作回调函数                                            | function(value: array, oldValue: array) | -              |
| onCancel          | 多选时取消操作回调函数                                            | function                                | -              |
| onSearch          | 搜索文本框变化时回调此函数                                        | function(value: string)                 | -              |
| onSelectOpen      | 下拉选择框弹开的时候回调此函数                                    | function                                | -              |
| onSelectClose     | 下拉选择框关闭的时候回调此函数                                    | function                                | -              |
| onBeforeChange    | 确认选择值之前回调此函数，仅支持单选                              | function(value)                         | -              |
| confirmTemplate   | 自定义确认取消按钮模板(适用于多选下拉)                            | function:({ onOk, onCancel })           | 组件默认模板   |

### Option

| 属性      | 说明                                         | 类型          | 默认值 |
| --------- | -------------------------------------------- | ------------- | ------ |
| disabled  | 下拉禁用状态                                 | boolean       | false  |
| value     | 默认使用此属性进行基本操作，选中 option 的值 | string\number | -      |
| item      | 当前选项的原始属性，包含index值                 | object | -      |
| className | 该项 option 的类名                           | string        | -      |

 ### 代码演示 

<embed src="@components/cascade/demos/oneCascade.md" /> 
<embed src="@components/cascade/demos/moreCascade.md" /> 
<embed src="@components/cascade/demos/supportTitle.md" /> 
