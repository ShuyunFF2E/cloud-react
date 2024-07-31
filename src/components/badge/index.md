---
title: Badge 徽标
nav:
  title: Badge 徽标
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

### API

| 属性      | 说明                                                          | 类型          | 默认值    |
| --------- | ------------------------------------------------------------- | ------------- | --------- |
| mode      | 徽标模式，包含 `message`、`number`、`dot`                     | string        | `message` |
| type      | 徽标类型，包含 `default`、`success`、`fail`、`warn`、`finish` | string        | `default` |
| number    | mode 为 number 时，需要设置 number 值                         | number        | 0         |
| text      | mode 为 dot 时，需要设置 text 值                              | string        | ''        |
| onClick   | 点击徽标回调事件                                              | function      | () => {}  |
| style     | 设置最外层样式                                                | CSSProperties | {}        |
| className | 设置最外层类样式                                              | string        | ''        |
| isSquare | 文本样式是否是方形（默认圆角为 8px；方形圆角为 3px）                                              | bool        | false        |
| color |  徽标颜色                                             | string        | ''        |

### 代码演示

<embed src="@components/badge/demos/basic-badge.md" />
