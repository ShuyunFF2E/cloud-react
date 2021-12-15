---
title: Card 卡片
nav:
  title: Card 卡片
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /data
---

### API

#### Card

| 属性        | 说明                 | 类型             | 默认值     | 可选值     |
| ----------- | -------------------- | ---------------- | ---------- |---------- |
| actions  | 卡片底部的操作组         | Array(ReactNode)            | -      ||
| extra  | 卡片右上角的操作区域               | ReactNode            |-         ||
| title      | 卡片标题            | ReactNode string | -        | |
| cover      | 卡片封面             | ReactNode |      | |
| coverShape      | 指定头像的形状            | string | rectangle        | `rectangle` `square`|

#### Card.Mate
| 属性        | 说明                 | 类型             | 默认值     | 可选值     |
| ----------- | -------------------- | ---------------- | ---------- |---------- |
| avatar  | 头像         | ReactNode            | -      ||
| title  | 标题内容               | ReactNode            |        ||
| description      | 描述内容            | ReactNode | -        | |

 ### 基础卡片

<embed src="@components/card/demos/basic-card.md" /> 

 ###  Card.Mate 

<embed src="@components/card/demos/mate-card.md" /> 

### 带封面的卡片

<embed src="@components/card/demos/cover-card.md" /> 

###  灵活的内容展示

<embed src="@components/card/demos/basic-mate-card.md" /> 