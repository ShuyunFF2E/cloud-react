---
category: Components
title: CcMenu
subtitle: 侧边导航
---

### 何时使用
业务组件，带有店铺选择功能的侧边栏菜单，适用于数据赢家通用侧边栏。

### API

### CcMenu
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shopSource | 店铺资源  | array | [] |
| menuSource | 菜单资源 | array | [] |
| topPlaceholder | 顶部占位符 | node | null |
| searchPlaceholder | 店铺选择器搜索框placeholder | string | '请输入关键字' |
| checkedPlat | 选中的平台信息 | object | {} |
| checkedShop | 选中的店铺信息 | object | {} |
| onMenuItemClick | 菜单项点击时的回调 | function | - |
| onSubMenuToggle | 子菜单展开收缩时的回调 | function | - |
| onShopSearch | 店铺搜索时的回调 | function | - |
| onShopChange | 选中的店铺变化时的回调 | function | - |
