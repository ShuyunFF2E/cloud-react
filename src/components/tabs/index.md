---
title: Tabs 选项卡
nav:
  title: Tabs 选项卡
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

选项卡切换组件

### API

### Tabs

| 属性             | 说明                                                     | 类型              | 默认值           |
| ---------------- | -------------------------------------------------------- | ----------------- | ---------------- |
| defaultActiveKey | 初始化选中面板的 key                                     | string            | -                |
| activeKey        | 当前激活 tab 面板的 key                                  | string            | ''               |
| activeClassName  | 可自定义选项卡被选中时的样式                             | string            | 'active'         |
| mode             | 当前 tabpanel 的渲染模式                                 | `reset`、`remain` | `reset`          |
| onChange         | 切换面板时触发事件                                       | Function          | (key)=>{}        |
| onClose          | 关闭面板时触发事件                                       | Function          | (key)=>{}        |
| type             | 页签的基本样式，可选 `line` `card`                       | string            | card             |
| step             | 当超过当前行的宽度出现滚动，点击箭头时一次可以滑动的距离 | number            | tab 列表宽度 / 3 |
| className        | 设置类样式                                               | string            | ''               |
| style            | 设置行内样式                                             | object            | {}               |

### Tabs.Panel

| 属性        | 说明                                        | 类型              | 默认值 |
| ----------- | ------------------------------------------- | ----------------- | ------ |
| tab         | 选项卡头显示文字                            | ReactNode、string | -      |
| key         | 必传，当前 panel 的唯一标志，对应 activeKey | string            | -      |
| disabled    | 禁用标志                                    | boolean           | false  |
| closable    | 显示关闭按钮                                | boolean           | false  |
| fixed       | 是否固定这个 tab                            | boolean           | false  |
| className   | 设置类样式                                  | string            | ''     |
| style       | 设置行内样式                                | object            | {}     |
| tabBarStyle | 设置 tab 的 header                          | object            | {}     |

 ### 代码演示 

<embed src="@components/tabs/demos/basic-tabs.md" /> 

<embed src="@components/tabs/demos/dynamic.md" /> 

<embed src="@components/tabs/demos/fixed.md" /> 

<embed src="@components/tabs/demos/line.md" /> 
