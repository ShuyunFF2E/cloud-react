---
category: Components
title: AreaSelector
subtitle: 地址选择器
---

### 何时使用
当需要地区选择交互时使用

### API

### AreaSelector

| 属性 | 说明 | 类型 | 默认值
| --- | --- | --- | --- |
| platform | 地址选择器对应的平台 | `taobao` `unification` `jos` |  `unification`  |
| server | 地址数据源接口对应的服务器地址 | String |  `https://qa-ual.shuyun.com` |
| selectedData | 已选中的地址集合 | Array |  []  |
| visible | 地址选择器是否打开 | Boolean |  false  |
| dataHandler | 在数据被加载到地址选择器之前，数据预处理函数 | Function |  data => data  |
| onOk | 点击确认关闭地址选择器时回调,返回地址选择器的输出数据 | Function |  result => console.log('地址选择器的输出：', result)  |
| onCancel | 点击取消关闭地址选择器时的回调 | Function |  () => {}  |
| onClose | 点击右上关闭按钮时触发的回调 | Function |  () => {}  |
| onCheckItem | 选中地址项时的回调 | Function | () => {}  |
| onSelectItem | 激活地址项时的回调 | Function | () => {}  |
| onRemoveItem | 移除某一项结果时回调 | Function | () => {}  |







