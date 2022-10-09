---
title: CDropdown 下拉菜单
nav:
  title: CDropdown 下拉菜单
  path: /cloud-react
group:
  order: 4
  title: 导航
  path: /nav
---

### 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

### API

#### DropDown

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 菜单是否禁用 | boolean | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。| (triggerNode: HTMLElement) => HTMLElement | () => document.body |
| overlay | 菜单 | ReactNode | - |
| overlayClassName | 下拉根元素的类名称 | string | - |
| placement | 菜单弹出位置：`bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight` | string | `bottomLeft` |
| trigger | 触发下拉的行为, 移动端不支持 hover | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |
| open | 菜单是否显示 | boolean | - |
| onOpenChange | 菜单显示状态改变时调用，点击菜单按钮导致的消失不会触发。| (open: boolean) => void | - |

#### Dropdown.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonsRender | 自定义左右两个按钮 | [ReactNode, ReactNode] | - |
| danger | 设置危险按钮 | boolean | - |
| disabled | 菜单是否禁用 | boolean | - |
| icon | 右侧的 icon | ReactNode | - |
| overlay | 菜单 | ReactNode| - |
| placement | 菜单弹出位置：`bottom` `bottomLeft` `bottomRight` `top` `topLeft` `topRight` | string | `bottomLeft` |
| trigger | 触发下拉的行为 | Array&lt;`click`\|`hover`> | \[`hover`] |
| type | 按钮类型，和 [Button](/cloud-react/common/button) 一致 | string | `normal` |
| open | 菜单是否显示 | boolean | - |
| onClick | 点击左侧按钮的回调，和 [Button](/cloud-react/common/button) 一致 | (event) => void | - |
| onOpenChange | 菜单显示状态改变时调用 | (open: boolean) => void | - |

#### Dropdown.Menu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClick | 菜单类目点击事件 | (event) => void | - |


#### Dropdown.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 右侧的 icon | ReactNode | - |
| id | 菜单类目唯一key，点击类目时，会返回 | (event) => void | - |
| type | type枚举类型： `divider`  表示分割线 | String | '' |
| disabled | 类目是否禁用点击 | boolean | '' |


### 代码演示 
<embed src="@components/c-dropdown/demos/simple.md" />

<embed src="@components/c-dropdown/demos/buttonStyle.md" />
<embed src="@components/c-dropdown/demos/button.md" />

<embed src="@components/c-dropdown/demos/trigger.md" />
<embed src="@components/c-dropdown/demos/placement.md" />
<embed src="@components/c-dropdown/demos/controllableCom.md" />
