---
category: Components
title: Menu
subtitle: 菜单项
---

### 何时使用
侧边菜单，用于提供页面导航。

### API

### Menu
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| header | 菜单的额外头部 | node | - |
| source | 菜单资源  | array | - |
| openKey | 打开的子菜单的key | array | - |
| selectedKeys | 选中的的菜单项的key | array | - |
| type | 菜单类型 'common', 'link' | string  | 'common' |
| indent | 菜单项缩进值px | number  | 10 |
| style | 根节点样式 | object  | {} |
| onSubMenuToggle | 子菜单展开收缩时触发回调 | function  | - |
| onItemClick | 子菜点击时触发回调 | function  | - |

### Menu.MenuItem
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 菜单项唯一key，必填项  | string | - |

### Menu.SubMenu
| 属性 | 说明 | 类型 | 默认值
| --- | --- | --- | --- |
| key | 子菜单唯一key，必填项  | string | - |
| title | 子菜单内容 | node | null |
