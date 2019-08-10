---
category: Components
title: Sms
subtitle: 短信编辑器
---

### 何时使用
用户通过该编辑器自定义短信内容，编写对应的营销内容。

### API

#### Sms
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 短信编辑器内容 | string |  |
| keywords | 变量集合 | Array |  |
| isTrimSpace | 是否删除短信内容两边空格 | boolean | true |
| disabled | 短信编辑器禁止编辑 | boolean | false |
| customSignature | 自定义短信签名 | string |  |
| customSignature | 自定义短信签名 | string |  |
| useUnsubscribe | 是否使用回T退 | boolean | false |
| unsubscribeText | 退订的默认文案 | string | 回T退 |
| gateway | 短信通道类型 | object |  |


#### gateway
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gatewayId | 短信通道id | number |  |
| wordsLimit | 单条短信字数限制 | number | 70 |
| multiLimit | 多条短信字数限制 | number | 67 |
| signature | 短信通道内置签名 | string |  |
| gatewayType | 短信通道类型 | number |  |

### 业务方获取内部数据

通过`ref`去获取所需要的数据方法`getOuterData`

### 字段说明
| 字段 | 说明 |
| editorText | 编辑器文本 |
| previewText | 预览文本  |
| totalChars | 总字数 |
| newLineNumber | 换行数 |
| variableNumber | 变量数 |

