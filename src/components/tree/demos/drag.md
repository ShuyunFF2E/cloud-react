---
order: 11
title: 拖拽用法
desc: 支持拖拽同级节点进行位置互换
---

```jsx

            /**
             * title: 拖拽用法
             * desc: 支持拖拽同级节点进行位置互换
             */
import React from 'react';
import { Tree } from 'cloud-react';

export default class TreeDemo extends React.Component {
	selectedNode = node => {
		console.info('已选择一个节点，节点信息是：');
		console.log(node);
	};

    onDragBefore = (node) => {
        console.log('将要移动的节点: ', node);
    }

    onDragMoving = (node, aimNode) => {
        // console.log('正在移动的节点: ', node);
        // console.log('目标节点: ', aimNode);
    }

    onDragAfter = (node, aimNode, pNode) => {
        console.log('最终替换的节点: ', node);
        console.log('最终被替换的节点: ', aimNode);
        console.log('父节点: ', pNode);
    }

	render() {
		const treeData = [
			{
				id: 1,
				name: '所有1',
				pId: null,
				disableRemove: true,
				disableRename: true,
				children: [
					{
						id: 11,
						name: '禁止删除节点11',
						pId: 1,
						disableRemove: true,
						children: [
							{
								id: 111,
								name: '删除一个111',
								pId: 11,
								children: []
							},
							{
								id: 112,
								name: '删除两个112',
								pId: 11,
								children: []
							},
							{
								id: 113,
								name: '删除三个113',
								pId: 11,
								children: [
									{
										id: 1131,
										name: '禁止删除节点1131',
										pId: 113,
										children: []
									},
									{
										id: 1132,
										name: '禁止删除节点1132',
										pId: 113
									},
                                    {
										id: 1133,
										name: '禁止删除节点1133',
										pId: 113,
										children: []
									},
                                    {
										id: 1134,
										name: '禁止删除节点1134',
										pId: 113,
										children: []
									},
                                    {
										id: 1135,
										name: '禁止删除节点1135',
										pId: 113,
										children: []
									},
								]
							},
							{
								id: 114,
								name: '禁止删除节点114',
								pId: 11,
								children: []
							}
						]
					},
					{
						id: 12,
						name: '禁止新增节点12',
						pId: 1,
						disableAdd: true,
						children: [
							{
								id: 121,
								name: '禁止新增节点121',
								pId: 12,
								children: [
									{
										id: 1211,
										name: '禁止新增节点1211',
										pId: 121,
										children: []
									},
									{
										id: 1212,
										name: '禁止新增节点1212',
										pId: 121,
										children: []
									},
									{
										id: 1213,
										name: '禁止新增节点1213',
										pId: 121,
										children: []
									}
								]
							},
							{
								id: 122,
								name: '禁止新增节点122',
								pId: 12,
								children: [
									{
										id: 1221,
										name: '禁止新增节点1221',
										pId: 122,
										children: []
									},
									{
										id: 1222,
										name: '禁止新增节点1222',
										pId: 122,
										children: []
									}
								]
							}
						]
					},
					{
						id: 13,
						name: '禁止重命名节点13',
						pId: 1,
						disableRename: true,
						children: [
							{
								id: 131,
								name: '禁止重命名节点131',
								pId: 13,
								children: [
									{
										id: 1311,
										name: '禁止重命名节点1311',
										pId: 131,
										children: []
									},
									{
										id: 1312,
										name: '禁止重命名节点1312',
										pId: 131,
										children: []
									},
									{
										id: 1313,
										name: '禁止重命名节点1313',
										pId: 131,
										children: []
									}
								]
							},
							{
								id: 132,
								name: '禁止重命名节点132',
								pId: 13,
								children: [
									{
										id: 1321,
										name: '禁止重命名节点1321',
										pId: 132,
										children: []
									}
								]
							}
						]
					},
					{
						id: 14,
						name: '未分类14',
						pId: 1,
						disableRemove: true,
						disableAdd: true,
						disableRename: true,
						children: []
					}
				]
			}
		];
		return (
			<Tree
				treeData={treeData}
				isUnfold
                supportDrag
                onDragBefore={this.onDragBefore}
                onDragMoving={this.onDragMoving}
                onDragAfter={this.onDragAfter}
				onSelectedNode={this.selectedNode}/>
		);
	}
}
```
