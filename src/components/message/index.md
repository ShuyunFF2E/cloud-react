---
category: Components
title: Message
subtitle: 全局提示
---

### 何时使用
可提供成功和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。


### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| msg | 提示内容 | string | - |
| options | 可选参数 | object | 参照options部分 |

### options
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| options.duration | 自动关闭的延时，单位毫秒。设为 0 时不自动关闭 | number | 3000 |

### message.method()
- message.success(msg, options)

- message.error(msg, options)
