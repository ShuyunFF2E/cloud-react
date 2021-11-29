---
order: 3
title: 多选、支持右键菜单
desc: 支持右键菜单、支持多选节点
---

```jsx

            /**
             * title: 多选、支持右键菜单
             * desc: 支持右键菜单、支持多选节点
             */
import React from 'react';
import { Tree } from 'cloud-react';

export default class TreeDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			supportMenu: true,
			supportCheckbox: true
		};
	}

	selectedNode = (node, selectedList) => {
		console.info('已选择一个节点，节点信息是：');
		console.log(node);
		console.info('目前已选择节点列表，列表信息是：');
		console.log(selectedList);
	};

	addNode = (pId, name) => {
		console.info('向后端发送一条请求，新增一个节点，参数为' + 'pId:' + pId + ',' + 'name:' + name);
		return new Promise((resolve, reject) => {
			resolve({ data: Math.floor(Math.random() * 10000) });
			// reject('新增失败');
		});
	};

	renameNode = (id, name) => {
		console.info('向后端发送一条请求，重命名一个节点，参数为' + 'id:' + id + ',' + 'name:' + name);
		return new Promise((resolve, reject) => {
			resolve({ data: '重命名成功' });
			// reject('重命名失败');
		});
	};

	removeNode = id => {
		console.info('向后端发送一条请求，删除一个节点，参数为' + 'id:' + id);
		return new Promise((resolve, reject) => {
			resolve({ data: '删除成功' });
			// reject('删除失败');
		});
	};

	render() {
		const treeData = [
			{
				id: 1,
				name: '所有',
				pId: null,
				children: [
					{
						id: 11,
						name: '禁止新增节点',
						pId: 1,
						disableAdd: true,
						children: [
							{
								id: 111,
								name: '22323',
								pId: 11,
								categoryType: 0
							}
						]
					},
					{
						id: 12,
						name: '禁止删除节点',
						pId: 1,
						disableRemove: true,
						children: [
							{
								id: 121,
								name: '禁止重命名节点',
								pId: 12,
								disableRename: true,
								children: [
									{
										id: 1211,
										name: '2345',
										pId: 121
									}
								]
							},
							{
								id: 122,
								name: 'lerous',
								pId: 12
							},
							{
								id: 123,
								name: 'baukh321',
								pId: 12
							},
							{
								id: 124,
								name: 'bauh789',
								pId: 12
							},
							{
								id: 125,
								name: 'baukh',
								pId: 12
							}
						]
					},
					{
						id: 13,
						name: '未分类',
						pId: 1
					}
				]
			}
		];
		return (
			<Tree
				treeData={treeData}
				supportMenu={this.state.supportMenu}
				supportCheckbox={this.state.supportCheckbox}
				onAddNode={this.addNode}
				onRenameNode={this.renameNode}
				onRemoveNode={this.removeNode}
				onSelectedNode={this.selectedNode}
			/>
		);
	}
}
```
