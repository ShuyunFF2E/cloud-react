---
category: Components
title: Tree
subtitle: 树
---

### 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形层级结构，支持单选、多选、查询、新增、删除、重命名节点等功能；

### API

| 属性                     | 说明                                                                 | 类型     | 默认值            |
| ------------------------ | -------------------------------------------------------------------- | -------- | ----------------- |
| treeData                 | 树结构数据                                                           | Array    | -                 |
| className                | class 名称方式设置 treeList 样式                                     | String   | -                 |
| style                    | 对象方式设置 treeList 样式                                           | Object   | -                 |
| selectedValue            | 被选中数据，需要回显的数据，仅支持多选类型                           | Array    | -                 |
| searchPlaceholder        | 搜索框默认 placeholder 信息                                          | String   | -                 |
| searchMaxLength          | 搜索框搜索关键字最大支持长度                                         | Number   | -                 |
| nodeNameMaxLength        | 节点名称最大支持长度                                                 | Number   | -                 |
| maxLevel                 | 树结构最大支持层级，超过该层级则不可新增                             | Number   | -                 |
| supportCheckbox          | 是否支持多选，false 为单选，true 为多选                              | Boolean  | false             |
| supportMenu              | 是否支持右键菜单                                                     | Boolean  | true              |
| menuType                 | 菜单类型，支持弹框形式(dialogMenu)与右键菜单(rightMenu)形式，                    | String  | rightMenu              |
| addMenuName              | 菜单类型为弹框类型时，弹框中显示的新增相关的名称                  | String  | 子目录              |
| supportDrag              | 是否支持拖拽                                                     | Boolean  | false              |
| isUnfold                 | 是否展开存在子节点的节点，默认不展开（根节点一直展开）               | Boolean  | false             |
| showIcon                 | 是否显示节点前面的 icon                                              | Boolean  | false             |
| openIconType             | 节点前面的展开 icon 类型，可在 icon 组件中查看相关类型               | String   | folder-solid-open |
| closeIconType            | 节点前面的关闭 icon 类型，可在 icon 组件中查看相关类型               | String   | folder-solid      |
| iconColor                | 节点前面的 icon 颜色                                                 | String   | #999              |
| supportImmediatelySearch | 是否支持实时搜索, supportSearch 必须为 true                          | Boolean  | false             |
| supportSearch            | 是否支持搜索                                                         | Boolean  | false             |
| isAddFront               | 新增节点时是否在当前节点的第一个子节点位置新增，false 则新增到最后面 | Boolean  | true              |
| onDoubleClick            | 双击节点事件                                                       | Function | -                 |
| onAddNode                | 新增节点事件，需要返回 Promise                                       | Function | -                 |
| onRenameNode             | 重命名节点事件，需要返回 Promise                                     | Function | -                 |
| onRemoveNode             | 删除节点事件，需要返回 Promise                                       | Function | -                 |
| onSelectedNode           | 选中节点事件，返回选中的节点数据                                     | Function | -                 |
| onSearchNode             | 节点搜索事件，返回搜索后的搜索值与搜索结果，搜索结果为搜索后的树结构 | Function | -                 |
| onDragBefore             | 拖拽前调用      	    | Function	| -	|
| onDragMoving             | 拖动过程中调用	    | Function	| -	|
| onDragAfter              | 拖拽后调用	        | Function	| -	|
 
### 数据属性

-   disableAdd: 布尔类型，设置为 true 则表示不可新增；
-   disableRename: 布尔类型，设置为 true 则表示不可重命名；
-   disableRemove: 布尔类型，设置为 true 则表示不可删除；
-   disableSelected: 布尔类型，设置为 true 则表示不可选择，只是不可选择该节点，若有子节点，其子节点仍可以选择；
-   pId：父节点 id

### 数据格式：treeData 属性值

**注意：根节点 pId 不可为数字 0**

```json
[
	{
		"id": 1,
		"name": "所有",
		"pId": null,
		"children": [
			{
				"id": 11,
				"name": "禁止新增节点",
				"pId": 1,
				"disableAdd": true,
				"children": [
					{
						"id": 111,
						"name": "22323",
						"pId": 11,
						"categoryType": 0
					}
				]
			},
			{
				"id": 12,
				"name": "禁止删除节点",
				"pId": 1,
				"disableRemove": true,
				"children": [
					{
						"id": 121,
						"name": "禁止重命名节点",
						"pId": 12,
						"disableRename": true,
						"disableSelected": true,
						"children": [
							{
								"id": 1211,
								"name": "2345",
								"pId": 121
							}
						]
					},
					{
						"id": 122,
						"name": "lerous",
						"pId": 12
					},
					{
						"id": 123,
						"name": "baukh321",
						"pId": 12
					},
					{
						"id": 124,
						"name": "bauh789",
						"pId": 12
					},
					{
						"id": 125,
						"name": "baukh",
						"pId": 12
					}
				]
			},
			{
				"id": 13,
				"name": "未分类",
				"pId": 1
			}
		]
	}
]
```
