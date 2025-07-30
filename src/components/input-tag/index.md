---
title: InputTag 多文本输入组件
nav:
  title: InputTag 多文本输入组件
  path: /cloud-react
group:
  order: 3
  title: 数据
  path: /data
---

### 何时使用

用户需要在一个框内输入多段文本，并且有明显的区分，输入一段按回车保存，按退格键删除最后一段文本。

### API

| 属性              | 说明                            | 类型            | 默认值 |
| ----------------- | ------------------------------- | --------------- | ------ |
| data              | 已存在的数据                    | array           | []     |
| max               | 最大数量限制                    | number          | 50     |
| disabled          | 是否禁用                        | boolean         | false  |
| maxWidth          | 单个 tag 的最大宽度，超出省略号 | number          | 200    |
| isConfigSeparator | 是否需要配置分隔符              | boolean         | false  |
| style             | 样式                            | object          | {}     |
| onChange          | 当数据发生变化时                | function(value) | noop   |

### 代码演示

<embed src="@components/input-tag/demos/basic-input-tag.md" />

<embed src="@components/input-tag/demos/disabled.md" />

<embed src="@components/input-tag/demos/separator.md" />

<embed src="@components/input-tag/demos/style.md" />
