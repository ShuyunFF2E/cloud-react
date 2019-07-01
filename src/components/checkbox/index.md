---
category: Components
title: Checkbox
subtitle: 多选按钮
---

### 何时使用
定义一组checkbox

### API Checkbox.Group
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前group对应的值的集合| any[] | [] |
| disabled | 当前group是否禁用 | boolean | false |
| onChange | 当前checkbox onChange 回调函数  | function([]:any) | -- |

### API Checkbox
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前checkbox对应的值| any | -- |
| checked | 当前checkbox是否选中 | boolean | false |
| disabled | 当前checkbox是否禁用 | boolean | false |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | false |
| onChange | 当前checkbox onChange 回调函数  | function(evt:Event) | -- |

### API Checkbox.Card
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前checkbox对应的值| any | -- |
| checked | 当前checkbox是否选中 | boolean | false |
| width | 当前checkbox的宽度 (px或者百分比) | string \| number | -- |
| height | 当前checkbox的高度 (px或者百分比) | string \| number | -- |
| disabled | 当前checkbox是否禁用 | boolean | false |
| onChange | 当前checkbox onChange 回调函数  | function(evt:Event) | -- |

