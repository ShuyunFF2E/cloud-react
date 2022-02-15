---
title: Tips 提示信息
nav:
  title: Tips 提示信息
  path: /cloud-react
group:
  order: 1
  title: 通用
  path: /common
---

### 何时使用

当某个页面需要向用户显示警告的信息时，非浮层的静态展现形式，始终展现，不会自动消失。

### API

| 属性  | 说明                                              | 类型              | 默认值 |
| ----- | ------------------------------------------------- | ----------------- | ------ |
| msg   | 提示内容                                          | ReactNode、string | -      |
| type  | 指定提示的样式, 有三种选择 normal、warning、major | string            | normal |
| style | 样式                                              | CSSProperties     | -      |

 ### 代码演示 

<embed src="@components/tips/demos/basic-tips.md" /> 
