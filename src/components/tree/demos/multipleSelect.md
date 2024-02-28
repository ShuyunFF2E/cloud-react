---
order: 2
title: 多选、无右键菜单、无搜索
desc: 无右键菜单、无搜索功能、支持多选节点
---

```jsx

            /**
             * title: 多选、无右键菜单、无搜索
             * desc: 无右键菜单、无搜索功能、支持多选节点
             */
import React from 'react';
import { Tree } from 'cloud-react';

class TreeDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			supportMenu: false,
			supportSearch: true,
			supportCheckbox: true
		};
	}

	selectedNode = (node, selectedList) => {
		console.info('已选择一个节点，节点信息是：');
		console.log(node);
		console.info('目前已选择节点列表，列表信息是：');
		console.log(selectedList);
	};

	render() {
		const treeData = [
			{
				id: 1,
				name: '所有',
				pId: null,
				disableRemove: true,
				disableRename: true,
				children: [
					{
						id: 11,
						name: '禁止删除节点',
						pId: 1,
						disableRemove: true,
						children: [
							{
								id: 111,
								name: '禁止删除节点1',
								pId: 11,
								children: []
							},
							{
								id: 112,
								name: '禁止删除节点2',
								pId: 11,
								children: []
							},
							{
								id: 113,
								name: '禁止删除节点3',
								pId: 11,
								children: [
									{
										id: 1131,
										name: '禁止删除节点31',
										pId: 113,
										children: []
									},
									{
										id: 1132,
										name: '禁止删除节点32',
										pId: 113,
										children: [
											{
												id: 11321,
												name: '禁止删除节点321',
												pId: 1132,
												children: []
											}
										]
									}
								]
							},
							{
								id: 114,
								name: '禁止删除节点4',
								pId: 11,
								children: []
							}
						]
					},
					{
						id: 12,
						name: '禁止新增节点',
						pId: 1,
						disableAdd: true,
						children: [
							{
								id: 121,
								name: '禁止新增节点1',
								pId: 12,
								children: [
									{
										id: 1211,
										name: '禁止新增节点11',
										pId: 121,
										children: []
									},
									{
										id: 1212,
										name: '禁止新增节点12',
										pId: 121,
										children: []
									},
									{
										id: 1213,
										name: '禁止新增节点13',
										pId: 121,
										children: []
									}
								]
							},
							{
								id: 122,
								name: '禁止新增节点2',
								pId: 12,
								children: [
									{
										id: 1221,
										name: '禁止新增节点21',
										pId: 122,
										children: []
									},
									{
										id: 1222,
										name: '禁止新增节点22',
										pId: 122,
										children: []
									}
								]
							}
						]
					},
					{
						id: 13,
						name: '禁止重命名节点',
						pId: 1,
						disableRename: true,
						children: [
							{
								id: 131,
								name: '禁止重命名节点1',
								pId: 13,
								children: [
									{
										id: 1311,
										name: '禁止重命名节点11',
										pId: 131,
										children: []
									},
									{
										id: 1312,
										name: '禁止重命名节点12',
										pId: 131,
										children: []
									},
									{
										id: 1313,
										name: '禁止重命名节点13',
										pId: 131,
										children: []
									}
								]
							},
							{
								id: 132,
								name: '禁止重命名节点2',
								pId: 13,
								children: [
									{
										id: 1321,
										name: '禁止重命名节点21',
										pId: 132,
										children: []
									}
								]
							}
						]
					},
					{
						id: 14,
						name: '未分类',
						pId: 1,
						disableRemove: true,
						disableAdd: true,
						disableRename: true,
						children: []
					}
				]
			}
		];
		return <Tree treeData={treeData} supportSearch={this.state.supportSearch} supportCheckbox={this.state.supportCheckbox} onSelectedNode={this.selectedNode}></Tree>;
	}
}
export default TreeDemo
```
