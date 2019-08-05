---
category: Components
title: Tree
subtitle: 树
---

### 何时使用
类似Select的选择控件，可选择的数据结构是一个树形层级结构，支持单选、多选、查询、新增、删除、重命名节点等功能；

### API
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchPlaceholder | 搜索框默认placeholder信息 | string | - |
| searchMaxLength | 搜索框搜索关键字最大支持长度 | number | - |
| nodeNameMaxLength | 节点名称最大支持长度 | number | - |
| maxLevel | 树结构最大支持层级，超过该层级则不可新增 | number | - |
| supportRadio | 是否支持单选，不可与多选共用 | boolean | false |
| supportCheckbox | 是否支持多选，不可与单选共用 | boolean | false |
| supportMenu | 是否支持右键菜单 | boolean | true |
| supportSearch | 是否支持搜索 | boolean | true |
| isAddFront | 新增节点时是否在当前节点的第一个子节点位置新增，false则新增到最后面 | boolean | true |
| onAddNode | 新增节点事件，需要返回Promise | function | - |
| onRenameNode | 重命名节点事件，需要返回Promise | function | - |
| onRemoveNode | 删除节点事件，需要返回Promise | function | - |
| onSelectedNode | 选中节点事件 | function | - |

### 数据属性
- disableAdd: 布尔类型，设置为true则表示不可新增；
- disableRename: 布尔类型，设置为true则表示不可重命名；
- disableRemove: 布尔类型，设置为true则表示不可删除；

