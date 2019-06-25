---
category: Components
title: Toggle
subtitle: 开关
---

### 何时使用
标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 开关大小，可选值：`default` `small`| string | default |
| checked | 指定当前是否选中 | boolean | false |
| checkedText | 选中时候的文案 | string |  |
| unCheckedText | 未选中时候的文案 | string |  |
| disabled | 是否禁用 | boolean | false |
| onChange | 切换状态时候的回调 | Function(checked: boolean, event: Event) |  |
