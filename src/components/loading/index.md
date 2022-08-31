---
title: Loading 加载
nav:
  title: Loading 加载
  path: /cloud-react
group:
  order: 5
  title: 反馈
  path: /action
---

### 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

### API

| 属性      | 说明                                           | 类型          | 默认值    |
| --------- | ---------------------------------------------- | ------------- | --------- |
| loading   | 是否为加载中状态                               | boolean       | true      |
| size      | loading 大小，包括 `small`、`default`、`large` | string        | `default` |
| layer     | 是否带背景层                                   | boolean       | false     |
| tip       | 自定义描述文案                                 | string        | ''        |
| delay     | 延迟显示加载效果的时间（防止闪烁）             | number (毫秒) | 0         |
| style     | 设置最外层样式                                 | CSSProperties | {}        |
| className | 设置最外层类样式                               | string        | ''        |

### 代码演示

<embed src="@components/loading/demos/basic-loading.md" />
<embed src="@components/loading/demos/embed.md" /> 
<embed src="@components/loading/demos/delay.md" />
<embed src="@components/loading/demos/size.md" />
<embed src="@components/loading/demos/tip.md" />
