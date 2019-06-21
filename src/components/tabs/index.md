---
category: Components
title: Tabs
subtitle: 选项卡
---

### 何时使用
选项卡切换组件

### 代码演示
<div id="code-demo"></div>

### API

### Tabs

| 属性 | 说明 | 类型 | 默认值 | isRequired |
| --- | --- | --- | --- | --- |
| defaultActiveKey | 初始化选中面板的key | string |  -  | 是 |
| activeKey | 当前激活 tab 面板的 key | string |  '' | 否 |
| type | 面板类型, 可选`card`、`tile` | string |  'card'  | 否 |
| onChange | 切换面板时触发事件 | Function |  ()=>{}  | 否 |
| onClose | 关闭面板时触发事件 | Function |  ()=>{}  | 否 |
| accentColor | 类型为`tile`时，可指定选中颜色 | '#0083ba' |  ()=>{}  | 否 |

### Tabs.TabPanel
| 属性 | 说明 | 类型 | 默认值 | isRequired |
| --- | --- | --- | --- | --- |
| tab | 选项卡头显示文字 | ReactNode、string |  -  | 是 |
| disabled | 禁用标志 | boolean |  false  | 否 |
| closable | 显示关闭按钮 | boolean |  false  | 否 |







