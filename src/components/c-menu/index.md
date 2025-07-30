---
title: CMenu 新菜单
nav:
  title: CMenu 新菜单
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

### Menu

| 属性                 | 说明                                                      | 类型                                                                           | 默认值                                        |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- |
| className            | menu 类名                                                 | string                                                                         | -                                             |
| mode                 | 菜单类型，支持垂直 vertical、内嵌 inline、水平 horizontal | string `vertical`、`inline`、`horizontal`                                      | `vertical`                                    |
| theme                | 菜单主题                                                  | string `light`、`dark`                                                         | `light`                                       |
| triggerSubMenuAction | 如何触发菜单选中事件                                      | click、hover                                                                   | horizontal 下默认 hover,vertical 下默认 click |
| onClick              | 菜单点击事件                                              | function({key:String, item:ReactComponent, domEvent:Event, keyPath: String[]}) | -                                             |
| onOpenChange         | 菜单展开收缩回调                                          | (openKeys:String[]) => void                                                    | -                                             |
| selectedKeys         | 选中的菜单                                                | String[]                                                                       | []                                            |
| defaultSelectedKeys  | 默认选中的菜单                                            | String[]                                                                       | []                                            |
| openKeys             | 展开的菜单                                                | String[]                                                                       | []                                            |
| defaultOpenKeys      | 默认展开的菜单                                            | String[]                                                                       | []                                            |
| inlineCollapsed      | 是否支持收缩导航栏(仅在 inline 与 vertical 下生效)        | boolean                                                                        | false                                         |

### Menu.Item

| 属性      | 说明                   | 类型      | 默认值                              |     |
| --------- | ---------------------- | --------- | ----------------------------------- | --- |
| key       | 菜单项唯一 key，必填项 | string    | -                                   |
| className | Item 类名              | string    | -                                   |
| disabled  | 是否禁用菜单           | boolean   | false                               |
| icon      | 菜单前的图标           | ReactNode | (props: MenuItemProps) => ReactNode | -   |

### Menu.SubMenu

| 属性      | 说明                   | 类型      | 默认值                              |
| --------- | ---------------------- | --------- | ----------------------------------- |
| key       | 菜单项唯一 key，必填项 | string    | -                                   |
| className | SubMenu 类名           | string    | -                                   |
| disabled  | 是否禁用菜单           | boolean   | false                               |
| icon      | 菜单前的图标           | ReactNode | (props: MenuItemProps) => ReactNode |
| title     | 菜单名称               | string    | -                                   |

### 代码演示

<embed src="@components/c-menu/demos/top-menu-simple.md" />
<embed src="@components/c-menu/demos/top-menu.md" />
<embed src="@components/c-menu/demos/top-menu-header.md" />
<embed src="@components/c-menu/demos/inline-menu.md" />
<embed src="@components/c-menu/demos/inline-menu-header.md" />
<embed src="@components/c-menu/demos/inline-menu-theme.md" />
<embed src="@components/c-menu/demos/vertical-menu.md" />
<embed src="@components/c-menu/demos/inline-collapsed.md" />
