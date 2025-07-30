---
title: Menu 菜单项
nav:
  title: Menu 菜单项
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

侧边菜单，用于提供页面导航。

### API

### Menu

| 属性            | 说明                      | 类型              | 默认值   |
| --------------- | ------------------------- | ----------------- | -------- |
| header          | 菜单的额外头部            | node              | -        |
| source          | 菜单资源                  | array             | -        |
| openKeys        | 打开的子菜单的 key        | array             | -        |
| selectedKeys    | 选中的的菜单项的 key      | array 或者 string | -        |
| type            | 菜单类型 'common', 'link' | string            | 'common' |
| indent          | 菜单项缩进值 px           | number            | 10       |
| style           | 根节点样式                | object            | {}       |
| onSubMenuToggle | 子菜单展开收缩时触发回调  | function          | -        |
| onItemClick     | 子菜点击时触发回调        | function          | -        |

### Menu.MenuItem

| 属性 | 说明                   | 类型   | 默认值 |
| ---- | ---------------------- | ------ | ------ |
| key  | 菜单项唯一 key，必填项 | string | -      |

### Menu.SubMenu

| 属性  | 说明                   | 类型   | 默认值 |
| ----- | ---------------------- | ------ | ------ |
| key   | 子菜单唯一 key，必填项 | string | -      |
| title | 子菜单内容             | node   | null   |

### 代码演示

<!-- <embed src="@components/menu/demos/basic-menu.md" />

<embed src="@components/menu/demos/header.md" />

<embed src="@components/menu/demos/link.md" />

<embed src="@components/menu/demos/source.md" />  -->
