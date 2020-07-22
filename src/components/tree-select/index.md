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
| type              | 下拉树类型，`default` `single` `multiple`                | string                        | 'default'            |
| allowClear        | 是否支持一键清除                                       | boolean                        | false            |
| ~~multiple~~      | ~~是否为多选下拉树~~                                      | ~~boolean~~                        | ~~false~~            |
| ~~single~~        | ~~是否为单选下拉树~~                                     | ~~boolean~~                        | ~~false~~            |
| disabled          | 下拉禁用状态                                           | boolean                        | false            |
| dataSource        | 需要展示的数据，与下拉树类型相关                                     | array                          | []               |
| defaultOpen       | 默认下拉菜单展开状态                                   | boolean                        | false            |
| open              | 下拉菜单展开状态，当使用此属性时组件本身 open 行为失效 | boolean                        | -                |
| placeholder       | 选择框默认文案                                         | string                         | -                |
| emptyRender       | 数据为空时下拉框显示内容                               | string\node                    | '暂时没有数据'   |
| defaultValue      | 默认选中的项                                           | array                          | -                |
| value             | 选中的项                                               | array                          | -                |
| dropdownStyle     | 下拉菜单的 style 属性                                  | object                         | -                |
| dropdownClassName | 下拉菜单的 className 属性                              | string                         | -                |
| isAppendToBody    | 下拉菜单渲染到 body 上                                 | boolean                        | false            |
| onChange          | 选中 option 变化时回调此函数                           | function(node, selectedNodes)  | -                |
| onSearch          | 搜索文本框变化时回调此函数                             | function(value: string, nodes) | -                |
| onSelectOpen      | 下拉选择框弹开的时候回调此函数                         | function                       | -                |
| onSelectClose     | 下拉选择框关闭的时候回调此函数                         | function                       | -                |

#### `single = true`，单选下拉树时候支持的配置
| 属性              | 说明                                                   | 类型                           | 默认值           |
| ----------------- | ------------------------------------------------------ | ------------------------------ | ---------------- |
| searchable        | 下拉框带搜索                  | boolean                        | false            |
| searchPlaceholder | 搜索框默认文案                                         | string                         | -                |


#### `multiple = true`，多选下拉树时候支持的配置

| 属性              | 说明                                                   | 类型                           | 默认值           |
| ----------------- | ------------------------------------------------------ | ------------------------------ | ---------------- |
| hasConfirmButton  | 是否有确认按钮                                   | boolean                        | false            |
| okBtnText         | 确认按钮文案                                 | string                         | '确认'           |
| cancelBtnText     | 取消按钮文案                                 | string                         | '取消'           |
| resetBtnText      | 重置按钮文案                                 | string                         | '重置'           |
| footerTypes       | 操作按钮类型，可选'ok', 'cancel', 'reset'        | array                          | ['ok', 'cancel'] |
| onOk              | 确认回调                                | function(node, selectedNodes)  | -                |
| onCancel          | 取消回调                                | function                       | -                |
| onReset           | 重置回调                                | function                       | -                |
| containParentNode | 结果是否包含各个父节点                           | boolean                        | false            |


树的更多属性配置可参考 **Tree** 组件
