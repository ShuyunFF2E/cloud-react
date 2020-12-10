---
order: 2
title: 多层单选与多选
desc: 与Tree结合的树下拉
---

```javascript
import React from 'react';
import { TreeSelect } from 'cloud-react';

export default class TreeSelectDemo extends React.Component {
	treeData = [
		{
			id: 11,
			name: '禁止删除节点',
			pId: 1,
			disableRemove: true,
			children: [
				{
					id: 113,
					name: '删除三个',
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
			id: 14,
			name: '未分类',
			pId: 1,
			disableRemove: true,
			disableAdd: true,
			disableRename: true,
			children: []
		}
	];

	constructor(props) {
		super(props);

		this.state = {
			selectedNodes: [
				{
					id: 112,
					name: '删除两个',
					pId: 11
				}
			],
			confirmNodes: [],
			singleNodes: [
				{
					id: 112,
					name: '删除两个',
					pId: 11
				}
			]
		};
        setTimeout(() => {
           this.setState({
              confirmNodes: [
                 {
                 					id: 113,
                 					name: '删除三个',
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
                 				}
              ]
           });
        }, 1000);

	}

	handleChange = (node, selectedNodes) => {
		console.log(node, selectedNodes);

		this.setState({
			selectedNodes
		});
	};

	onOk = (node, selectedNodes, value) => {
		console.log(node, selectedNodes, value);

		this.setState({
			confirmNodes: selectedNodes
		});
	};

	onChangeSingle = (node, selectedNodes) => {
		console.log(node, selectedNodes);

		this.setState({
			singleNodes: selectedNodes
		});
	};

	render() {
		return (
			<div>
				<span style={{ marginBottom: 5, fontSize: 12 }}>多选：</span>
				<TreeSelect
					type="multiple"
					isUnfold
					allowClear
					style={{ marginBottom: 20, width: 150 }}
					placeholder="选择一个选项"
					dataSource={this.treeData}
					dropdownStyle={{ color: 'red' }}
					dropdownClassName="test"
					value={this.state.selectedNodes}
					onChange={this.handleChange}
				/>
				<TreeSelect
					type="multiple"
                    searchable
					hasConfirmButton
					isUnfold
					allowClear
					placeholder="选择一个选项"
					style={{ marginBottom: 20 }}
					footerTypes={['ok', 'reset']}
					dataSource={this.treeData}
					showIcon={false}
					value={this.state.confirmNodes}
					onChange={this.handleChange}
					onOk={this.onOk}
				/>
				<span style={{ marginBottom: 5, fontSize: 12 }}>单选：</span>
				<TreeSelect
					type="single"
					isUnfold
					containParentNode
					placeholder="选择一个选项"
					style={{ marginBottom: 20 }}
					dataSource={this.treeData}
					value={this.state.singleNodes}
					onChange={this.onChangeSingle}
				/>

				<TreeSelect
					isAppendToBody
					type="single"
					isUnfold
					containParentNode
					position="auto"
					placeholder="选择一个选项"
					dataSource={this.treeData}
					value={this.state.singleNodes}
					onChange={this.onChangeSingle}
				/>
			</div>
		);
	}
}
```
