---
category: Components
subtitle: 文字提示
title: Tooltip
---

### 何时使用

鼠标移入则显示提示，移出消失。

可用来代替系统默认的 `title` 提示。

### API

| 参数            | 说明                                                                                                                                                          | 类型     | 默认值              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------- |
| content         | 内容（可以为任意一段 html 内容）                                                                                                                              | string   |                     |
| theme           | 主题, 可选 `dark` `light` `error`                                                                                                                             | string   | dark                |
| trigger         | 触发方式                                                                                                                                                      | string   | hover               |
| visible         | 用于手动控制浮层显隐                                                                                                                                          | boolean  | -                   |
| container       | 渲染节点，默认渲染到 body 上(如果指定容器，将会给指定容器添加position:relative)                                                                                    | function,string | () => document.body |
| clear           | 强制删除(特殊情况下使用)                                                                                                                                      | boolean  | false               |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：毫秒                                                                                                                  | number   | 1                   |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：毫秒                                                                                                                  | number   | 1                   |
| placement       | 气泡框位置，可选 `auto` `top` `left` `right` `bottom` `top-left` `top-right` `bottom-left` `bottom-right` `left-top` `left-bottom` `right-top` `right-bottom` | string   | auto                |
