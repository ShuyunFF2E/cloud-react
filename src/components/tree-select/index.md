---
title: TreeSelect 树下拉
nav:
  title: TreeSelect 树下拉
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时可用。

### API

| 属性              | 说明                                                                          | 类型                           | 默认值         |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------ | -------------- |
| type              | 下拉树类型，`default` `single` `multiple`                                     | string                         | 'default'      |
| allowClear        | 是否支持一键清除                                                              | boolean                        | false          |
| ~~multiple~~      | ~~是否为多选下拉树~~                                                          | ~~boolean~~                    | ~~false~~      |
| ~~single~~        | ~~是否为单选下拉树~~                                                          | ~~boolean~~                    | ~~false~~      |
| disabled          | 下拉禁用状态                                                                  | boolean                        | false          |
| size              | 输入框大小，可选值为 `large` `default` `small`                                | string                         | `default`      |
| dataSource        | 需要展示的数据，与下拉树类型相关                                              | array                          | []             |
| defaultOpen       | 默认下拉菜单展开状态                                                          | boolean                        | false          |
| open              | 下拉菜单展开状态，当使用此属性时组件本身 open 行为失效                        | boolean                        | -              |
| isUnfold          | 是否展开子节点，默认不展开                                                    | boolean                        | false          |
| placeholder       | 选择框默认文案                                                                | string                         | -              |
| emptyRender       | 数据为空时下拉框显示内容                                                      | string\node                    | '暂时没有数据' |
| defaultValue      | 默认选中的项                                                                  | array                          | -              |
| value             | 选中的项                                                                      | array                          | -              |
| dropdownStyle     | 下拉菜单的 style 属性                                                         | object                         | -              |
| dropdownClassName | 下拉菜单的 className 属性                                                     | string                         | -              |
| isAppendToBody    | 下拉菜单渲染到 body 上                                                        | boolean                        | false          |
| onChange          | 选中 option 变化时回调此函数                                                  | function(node, selectedNodes)  | -              |
| onSearch          | 搜索文本框变化时回调此函数                                                    | function(value: string, nodes) | -              |
| onSelectOpen      | 下拉选择框弹开的时候回调此函数                                                | function                       | -              |
| onSelectClose     | 下拉选择框关闭的时候回调此函数                                                | function                       | -              |
| showTag           | 多选下拉已选项为 tag 形式                                                     | boolean                        | true           |
| scrollSelected    | 设置 `scrollSelected` 为 `true`，则已选项超长可滚动                           | boolean                        | false          |
| maxTagCount       | 多选下拉最多显示多少个 tag                                                    | number                         | 1              |
| maxHeight         | 多选下拉框最大高度                                                            | number                         | -              |
| position          | 下拉框定位：`top` `bottom` `auto`（是否启用自动定位，如需使用可设置为`auto`） | string                         | `bottom`       |
| dropdownClassName | 下拉框类名                                                                    | string                         | -              |
| dropdownStyle     | 下拉框样式                                                                    | object                         | {}             |
| showPath          | 展示路径（和 动态加载数据 isDynamicLoad 无法同时使用）                        | bool                           | false          |
| onLoadData        | 动态加载数据                                                                  | Function                       | -              |
| isDynamicLoad     | 动态加载数据                                                                  | bool                           | false          |
| showLine          | 线性样式                                                                      | bool                           | false          |
| lineType          | 线性样式 `default` `dashed`                                                   | string                         | `default`      |
| borderRadiusSize  | 边框圆角 `default` `medium` `large`                                           | string                         | `default`      |

#### `single = true`，单选下拉树时候支持的配置

| 属性              | 说明           | 类型    | 默认值 |
| ----------------- | -------------- | ------- | ------ |
| searchable        | 下拉框带搜索   | boolean | false  |
| searchPlaceholder | 搜索框默认文案 | string  | -      |

#### `multiple = true`，多选下拉树时候支持的配置

| 属性              | 说明                                      | 类型                          | 默认值           |
| ----------------- | ----------------------------------------- | ----------------------------- | ---------------- |
| hasConfirmButton  | 是否有确认按钮                            | boolean                       | false            |
| okBtnText         | 确认按钮文案                              | string                        | '确认'           |
| cancelBtnText     | 取消按钮文案                              | string                        | '取消'           |
| resetBtnText      | 重置按钮文案                              | string                        | '重置'           |
| footerTypes       | 操作按钮类型，可选`ok`, `cancel`, `reset` | array                         | ['ok', 'cancel'] |
| onOk              | 确认回调                                  | function(node, selectedNodes) | -                |
| onCancel          | 取消回调                                  | function                      | -                |
| onReset           | 重置回调                                  | function                      | -                |
| containParentNode | 结果是否包含各个父节点                    | boolean                       | false            |

树的更多属性配置可参考 **Tree** 组件

### 代码演示

### 基础用法

<embed src="@components/tree-select/demos/basic.md" />

### 可搜索

<embed src="@components/tree-select/demos/searchable.md" />

[comment]: <> (### 不与 Tree 结合的树下拉)

[comment]: <> (<embed src="@components/tree-select/demos/basic-tree-select.md" />)

### 弹出位置

<embed src="@components/tree-select/demos/position.md" />

### 已选展示完整路径

<embed src="@components/tree-select/demos/path.md" />

### 动态加载节点

<embed src="@components/tree-select/demos/dynamicLoad.md" />

### 线性样式

<embed src="@components/tree-select/demos/line.md" />
