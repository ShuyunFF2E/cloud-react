---
category: Components
title: TreeSelect
subtitle: 树下拉
---

### 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时可用。

### API

| 属性              | 说明                                                   | 类型                           | 默认值           |
| ----------------- | ------------------------------------------------------ | ------------------------------ | ---------------- |
| allowClear        | 是否支持一键清除                                       | boolean                        | false            |
| multiple          | 是否为多选下拉树                                       | boolean                        | false            |
| single            | 是否为单选下拉树                                       | boolean                        | false            |
| disabled          | 下拉禁用状态                                           | boolean                        | false            |
| dataSource        | 需要展示的数据                                         | array                          | []               |
| defaultOpen       | 默认下拉菜单展开状态                                   | boolean                        | false            |
| open              | 下拉菜单展开状态，当使用此属性时组件本身 open 行为失效 | boolean                        | -                |
| placeholder       | 选择框默认文案                                         | string                         | -                |
| searchPlaceholder | 搜索框默认文案                                         | string                         | -                |
| searchable        | 使下拉框带搜索（多选暂不支持搜索）                     | boolean                        | false            |
| emptyRender       | 数据为空时下拉框显示内容                               | string\node                    | '暂时没有数据'   |
| defaultValue      | 默认选中的项                                           | array                          | -                |
| value             | 选中的项                                               | array                          | -                |
| hasConfirmButton  | 多选时是否有确认按钮                                   | boolean                        | false            |
| okBtnText         | 多选时确认操作按钮文案                                 | string                         | '确认'           |
| cancelBtnText     | 多选时取消操作按钮文案                                 | string                         | '取消'           |
| resetBtnText      | 多选时重置操作按钮文案                                 | string                         | '重置'           |
| footerTypes       | 多选时操作按钮类型，可选'ok', 'cancel', 'reset'        | array                          | ['ok', 'cancel'] |
| dropdownStyle     | 下拉菜单的 style 属性                                  | object                         | -                |
| dropdownClassName | 下拉菜单的 className 属性                              | string                         | -                |
| isAppendToBody    | 下拉菜单渲染到 body 上                                 | boolean                        | false            |
| containParentNode | 多选时结果是否包含各个父节点                           | boolean                        | false            |
| onChange          | 选中 option 变化时回调此函数                           | function(node, selectedNodes)  | -                |
| onOk              | 多选时确认操作回调函数                                 | function(node, selectedNodes)  | -                |
| onCancel          | 多选时取消操作回调函数                                 | function                       | -                |
| onReset           | 多选时重置操作回调函数                                 | function                       | -                |
| onSearch          | 搜索文本框变化时回调此函数                             | function(value: string, nodes) | -                |
| onSelectOpen      | 下拉选择框弹开的时候回调此函数                         | function                       | -                |
| onSelectClose     | 下拉选择框关闭的时候回调此函数                         | function                       | -                |

树的更多属性配置可参考 Tree 组件
