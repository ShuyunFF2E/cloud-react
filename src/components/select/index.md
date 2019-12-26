---
category: Components
title: Select
subtitle: 下拉选择
---

### 何时使用
弹出一个下拉菜单给用户选择，包含单选及多选，用来代替原生的选择器。

### API
### Select
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否支持一键清除 | boolean | false |
| multiple | 是否为多选 | boolean | false |
| disabled | 下拉禁用状态 | boolean | false |
| dataSource | 需要展示的数据，dataSource和children同时存在时以children为准 | array | [] |
| labelkey | 指定使用的label键值，仅在使用dataSource生成组件时生效 | string | 'label' |
| valueKey | 指定使用的value键值，仅在使用dataSource生成组件时生效 | string | 'value' |
| defaultOpen | 默认下拉菜单展开状态 | boolean | false |
| open | 下拉菜单展开状态，当使用此属性时组件本身open行为失效 | boolean | - |
| placeholder | 选择框默认文案 | string | - |
| seachable | 使下拉框带搜索 | boolean | false |
| emptyRender | 数据为空时下拉框显示内容 | string\node | '暂时没有数据' |
| defaultValue | 默认选中的项 | string\number\array | - |
| value | 选中的项 | string\number\array | - |
| labelInValue | 是否把每个选项的label包装到value中 | boolean | false |
| hasSelectAll | 多选时是否有全选 | boolean | false |
| hasConfirmButton | 多选时是否有确认按钮 | boolean | false |
| okBtnText | 多选时确认操作按钮文案| string | '确认' |
| cancelBtnText | 多选时取消操作按钮文案 | string | '取消' |
| className | 下拉菜单的 className 属性 | string | - |
| zIndex | 下拉菜单的 zIndex | number | 1050 |
| getPopupContainer | 下拉菜单渲染的父节点。如果发现下拉菜单被挡住，可以尝试修改定位父元素，如() => document.body | function(triggerNode) | triggerNode => triggerNode.parentElement |
| onChange | 选中option变化时回调此函数 | function(value, oldValue) | - |
| onOk | 多选时确认操作回调函数| function(value: array, oldValue: array) | - |
| onCancel | 多选时取消操作回调函数 | function | - |
| onSearch | 搜索文本框变化时回调此函数 | function(value: string) | - |
| onSelectOpen | 下拉选择框弹开的时候回调此函数 | function | - |
| onSelectClose | 下拉选择框关闭的时候回调此函数 | function | - |

### Option
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 下拉禁用状态 | boolean | false |
| value | 默认使用此属性进行基本操作，选中option的值 | string\number | - |
| className | 该项option的类名 | string | - |
