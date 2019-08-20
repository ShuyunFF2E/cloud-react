---
category: Components
title: Select
subtitle: 下拉选择
---

### 何时使用
弹出一个下拉菜单给用户选择，包含单选及多选【当前仅有单选】，用来代替原生的选择器。

### API
### Select
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 下拉禁用状态 | boolean | false |
| defaultOpen | 默认下拉菜单展开状态 | boolean | false |
| open | 下拉菜单展开状态，当使用此属性时组件本身open行为失效 | boolean | - |
| placeholder | 选择框默认文案 | string | - |
| seachable | 使下拉框带搜索 | boolean | false |
| emptyRender | 数据为空时下拉框显示内容 | string\node | '暂时没有数据' |
| defaultValue | 默认选中的项 | string\number | - |
| value | 选中的项 | string\number | - |
| labelInValue | 是否把每个选项的label包装到value中 | boolean | false |
| className | 下拉菜单的 className 属性 | string | - |
| onChange | 选中option变化时回调此函数 | function(value) | - |
| onSearch | 搜索文本框变化时回调此函数 | function(value: string) | - |
| onSelectOpen | 下拉选择框弹开的时候回调此函数 | function | - |
| onSelectClose | 下拉选择框关闭的时候回调此函数 | function | - |

### Option
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 下拉禁用状态 | boolean | false |
| value | 默认使用此属性进行基本操作，选中option的值 | string | - |
| className | 该项opton的类名 | string | - |
