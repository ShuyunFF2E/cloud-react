---
order: 4
title: 单选、支持右键菜单
desc: 支持右键菜单、支持单选节点
---

```javascript
import React from 'react';
import { Tree } from 'cloud-react';

export default class TreeDemo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			supportMenu: true,
		}
	}

	addNode = (pId, name) => {
		console.info('向后端发送一条请求，新增一个节点，参数为' + 'pId:' + pId + ',' + 'name:' + name);
		return new Promise(((resolve, reject) => {
			resolve({data: Math.floor(Math.random() * 10000)})
			// reject('新增失败');
		}));

	};

	renameNode = (id, name) => {
		console.info('向后端发送一条请求，重命名一个节点，参数为' + 'id:' + id + ',' + 'name:' + name);
		return new Promise(((resolve, reject) => {
			resolve({data: '重命名成功'})
			// reject('重命名失败');
		}));
    };

	removeNode = (id) => {
		console.info('向后端发送一条请求，删除一个节点，参数为' + 'id:' + id);
		return new Promise(((resolve, reject) => {
			resolve({data: '删除成功'})
			// reject('删除失败');
		}));
	};

	selectedNode = (node) => {
		console.info('已选择一个节点，节点信息是：');
		console.log(node);
	};


	render() {
		const treeData = [{
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
							children: [{
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
							}]
						},
						{
							id: 114,
							name: '禁止删除节点4',
							pId: 11,
							children: []
						}
					]
				}, {
					id: 12,
					name: '禁止新增节点',
					pId: 1,
					disableAdd: true,
					disableSelected: true,
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
				},{
					id: 14,
					name: '未分类',
					pId: 1,
					disableRemove: true,
					disableAdd: true,
					disableRename: true,
					children: []
				}
			]
		}];
		return (
			<Tree
				treeData={treeData}
				supportSearch={this.state.supportSearch}
				supportMenu={this.state.supportMenu}
				onAddNode={this.addNode}
				onRenameNode={this.renameNode}
				onRemoveNode={this.removeNode}
				onSelectedNode={this.selectedNode}>
			</Tree>
		);
	}
}
```
