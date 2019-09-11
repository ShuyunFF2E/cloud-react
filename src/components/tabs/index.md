---
category: Components
title: Tabs
subtitle: 选项卡
---

### 何时使用
选项卡切换组件

### API

### Tabs

| 属性 | 说明 | 类型 | 默认值
| --- | --- | --- | --- |
| defaultActiveKey | 初始化选中面板的key | string |  -  |
| activeKey | 当前激活 tab 面板的 key | string |  '' |
| mode | 当前tabpanel的渲染模式 | `reset`、`remain` | `reset`
| onChange | 切换面板时触发事件 | Function |  (key)=>{}  |
| onClose | 关闭面板时触发事件 | Function |  (key)=>{}  |
| className | 设置类样式 | string | '' |
| style | 设置行内样式 | string | {} |
| activeClassName | 可自定义选项卡被选中时的样式 | string |  'active'  |

### Tabs.Panel
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tab | 选项卡头显示文字 | ReactNode、string |  -  |
| key | 必传，当前panel的唯一标志，对应 activeKey,  | string |  -  |
| disabled | 禁用标志 | boolean |  false  |
| closable | 显示关闭按钮 | boolean |  false  |
| className | 设置类样式 | string | '' |
| style | 设置行内样式 | string | {} |







