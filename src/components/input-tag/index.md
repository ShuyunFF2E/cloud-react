---
category: Components
title: InputTag
subtitle: 多文本输入组件
---

### 何时使用

用户需要在一个框内输入多段文本，并且有明显的区分，输入一段按回车保存，按退格键删除最后一段文本。

### API

| 属性       | 说明             | 类型    | 默认值  |
| ---------- | ---------------- | ------- | ------- |
| data       | 已存在的数据         | array  | [] |
| maxWidth | 单个tag的最大宽度，超出省略号 | number | 200   |
| isConfigSeparator | 是否需要配置分隔符 | boolean | false   |
| style | 样式 | object | {}   |
| onChange | 当数据发生变化时 | function(value) | noop   |
