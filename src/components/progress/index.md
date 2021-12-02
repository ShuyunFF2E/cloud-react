---
title: Progress 进度条
nav:
    title: Progress 进度条
    path: /cloud-react
group:
    order: 1
    title: 通用
    path: /common
---

### 何时使用

使用进度条组件配合其他组件展示当前进度

### API

| 属性        | 说明                 | 类型             | 默认值     |
| ----------- | -------------------- | ---------------- | ---------- |
| type  | 进度条类型 `line` `circle`   | string            | `line`        |
| size  | 进度条尺寸 `small` `middle` `large`              | string            |`middle`         |
| color  | 进度条颜色             | string            |''         |
| percent  | 进度值             | number            |0         |
| showPercent      | 是否展示进度值            | boolean | false         |
| iconTpl      |     图标         | - | ''          |

<embed src="@components/progress/demos/basic.md" /> 
