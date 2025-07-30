---
title: PlainText 明密文显示
nav:
  title: PlainText 明密文显示
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

用于显示脱敏的加密数据。

### API

| 属性              | 说明         | 类型     | 默认值 |
| ----------------- | ------------ | -------- | ------ |
| text              | 文本显示     | string   |        |
| isPlain           | 是否为明文   | boolean  | false  |
| onViewPlainClick  | 点击查看明文 | function | noop   |
| onViewSecretClick | 点击查看密文 | function | noop   |

### 代码演示

<embed src="@components/plaintext/demos/basic-plaintext.md" />
