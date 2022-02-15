---
order: 9
title: 动态修改回显数据
desc: 在外部触发修改回显数据，组件内部跟随变化
---

```jsx

            /**
             * title: 动态修改回显数据
             * desc: 在外部触发修改回显数据，组件内部跟随变化
             */
import React from 'react';
import { Tree, Button } from 'cloud-react';

export default class TreeDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			supportCheckbox: true,
			selectedValue: [
				{
					id: 1212,
					name: '我哦我',
					pId: 121
				}
			]
		};
	}

	selectedNode = (node, selectedList) => {
		console.info('已选择一个节点，节点信息是：');
		console.log(node);
		console.info('目前已选择节点列表，列表信息是：');
		console.log(selectedList);
	};

	changeValue = () => {
		const randomSelected = [
			{
				id: 11,
				pId: 0
			},
			{
				id: 12,
				pId: 0
			},
			{
				id: 13,
				pId: 0
			},
			{
				id: 121,
				pId: 12
			},
			{
				id: 1211,
				pId: 121
			},
			{
				id: 1212,
				pId: 121
			},
			{
				id: 122,
				pId: 12
			},
			{
				id: 123,
				pId: 12
			},
			{
				id: 122,
				pId: 12
			},
			{
				id: 123,
				pId: 12
			},
			{
				id: 124,
				pId: 12
			},
			{
				id: 125,
				pId: 12
			}
		];

		this.setState(
			{
				selectedValue: [randomSelected[Math.floor(Math.random() * (randomSelected.length - 1))]]
			},
			() => {
				console.log('当前选中的节点', this.state.selectedValue);
			}
		);
	};

	render() {
		const treeData = [
			{
				id: 0,
				name: '根节点',
				pId: null,
				children: [
					{
						id: 11,
						name: '一级节点1',
						pId: 0,
						disableAdd: true,
						children: [
							{
								id: 111,
								name: '一级节点11',
								pId: 11,
								categoryType: 0
							}
						]
					},
					{
						id: 12,
						name: '一级节点2',
						pId: 0,
						disableRemove: true,
						children: [
							{
								id: 121,
								name: '一级节点21',
								pId: 12,
								disableRename: true,
								children: [
									{
										id: 1211,
										name: '一级节点211',
										pId: 121
									},
									{
										id: 1212,
										name: '节点212',
										pId: 121,
										children: [
											{
												id: 12121,
												name: '节点2121',
												pId: 1212
											},
											{
												id: 12122,
												name: '节点2122',
												pId: 1212
											}
										]
									}
								]
							},
							{
								id: 122,
								name: '节点22',
								disableSelected: true,
								pId: 12
							},
							{
								id: 123,
								name: '节点23',
								pId: 12
							},
							{
								id: 124,
								name: '节点24',
								pId: 12,
								children: [
									{
										id: 1241,
										name: '节点241',
										pId: 124
									},
									{
										id: 1242,
										name: '节点242',
										pId: 124
									}
								]
							},
							{
								id: 125,
								name: '节点25',
								pId: 12
							}
						]
					},
					{
						id: 13,
						name: '节点3',
						pId: 0
					}
				]
			}
		];
		return (
			<div>
				<Button onClick={this.changeValue}>随机选中数据</Button>
				<br />
				<br />
				<Tree
					treeData={treeData}
					supportCheckbox={this.state.supportCheckbox}
					selectedValue={this.state.selectedValue}
					onSelectedNode={this.selectedNode}
				/>
			</div>
		);
	}
}
```
