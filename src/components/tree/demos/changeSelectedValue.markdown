---
order: 9
title: 动态修改回显数据
desc: 在外部触发修改回显数据，组件内部跟随变化
---

```javascript
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
				id: 111,
				pId: 11
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
			},
            {
				id: 1241,
				pId: 124
			},
			{
				id: 1242,
				pId: 124
			},
			{
				id: 12121,
				pId: 1212
			},
            {
				id: 12122,
				pId: 1212
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

    removeNode = () => {
        return new Promise((resolve)  => {
            resolve('删除成功');
         }).then(() => {
            this.changeValue();
        })
    }


	render() {
		const treeData = [
			{
				id: 0,
				name: '根节点0',
				pId: null,
				children: [
					{
						id: 11,
						name: '一级节点11',
						pId: 0,
						disableAdd: true,
						children: [
							{
								id: 111,
								name: '一级节点111',
								pId: 11,
								categoryType: 0
							}
						]
					},
					{
						id: 12,
						name: '一级节点12',
						pId: 0,
						disableRemove: true,
						children: [
							{
								id: 121,
								name: '一级节点121',
								pId: 12,
								disableRename: true,
								children: [
									{
										id: 1211,
										name: '一级节点1211',
										pId: 121
									},
									{
										id: 1212,
										name: '节点1212',
										pId: 121,
										children: [
											{
												id: 12121,
												name: '节点12121',
												pId: 1212
											},
											{
												id: 12122,
												name: '节点12122',
												pId: 1212
											}
										]
									}
								]
							},
							{
								id: 122,
								name: '节点122',
								disableSelected: true,
								pId: 12
							},
							{
								id: 123,
								name: '节点123',
								pId: 12
							},
							{
								id: 124,
								name: '节点124',
								pId: 12,
								children: [
									{
										id: 1241,
										name: '节点1241',
										pId: 124
									},
									{
										id: 1242,
										name: '节点1242',
										pId: 124
									}
								]
							},
							{
								id: 125,
								name: '节点125',
								pId: 12
							}
						]
					},
					{
						id: 13,
						name: '节点13',
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
                多选选中：
				<Tree
					treeData={treeData}
					supportCheckbox
					selectedValue={this.state.selectedValue}
					onSelectedNode={this.selectedNode}
				/>

                <br />
				<br />
                单选选中：
                <Tree
                    treeData={treeData}
                    supportRadio
                    isUnfold
                    supportMenu
                    onRemoveNode={this.removeNode}
                    selectedValue={this.state.selectedValue}
                    onSelectedNode={this.selectedNode}
                />
			</div>
		);
	}
}
```
