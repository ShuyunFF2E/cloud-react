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

| 属性        | 说明                 | 类型             | 默认值     |
| ----------- | -------------------- | ---------------- | ---------- |
| mode  | 徽标展示模式         | string  `message` `number`            | `message`      |
| type  | 徽标类型               | string `default` `success` `fail` `warn`            |`default`         |
| number      | mode 为 `number` 时，需要设置 number 值             | number | 0          |
| onClick      | 点击徽标回调事件             | function | () => {}          |

 ### 代码演示 

<embed src="@components/badge/demos/basic-badge.md" /> 
