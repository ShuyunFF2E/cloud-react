---
category: Components
title: Radio
subtitle: 单选按钮
---

### 何时使用
定义一组radio 

### API Radio.Group
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认radio选中的值 | any | -- |
| value | 设置当前选中的值 | any | -- |
| onChange | 选中radio的回调函数 | function(value, evt:Event) | -- |
| disabled | 定义内部radio是否禁用 | boolean | false |
| horizontal | 定义radio横向布局 | boolean | false |
| vertical | 定义radio竖向布局 | boolean | false |

### API Radio
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前radio对应的值| any | -- |
| checked | 指定当前radio是否选中 | boolean | false |
| disabled | 是否禁用 | boolean | false |
