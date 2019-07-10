---
category: Components
title: Checkbox
subtitle: 多选按钮
---

### 何时使用
定义一个或者一组 checkbox

### API 
#### Checkbox
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultChecked | 指定当前是否选中 | boolean | -- |
| checked | 当前是否选中(受控) | boolean | -- |
| disabled | 是否禁用 | boolean | false |
| indeterminate | 设置 indeterminate 状态 | boolean | false |
| value | 当前 checkbox value | string | -- |
| onChange | 变化时回调函数 | Function(e:Event) | -- |

#### Checkbox.Group
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checkedValue | 选中项 | string[] | -- |
| disabled | 整组禁用 | boolean | -- |
| horizontal | 定义 checkbox 横向布局 | boolean | false |
| vertical | 定义 checkbox 竖向布局 | boolean | false |
| onChange | 变化时回调函数 | Function(e:Event) | -- |
