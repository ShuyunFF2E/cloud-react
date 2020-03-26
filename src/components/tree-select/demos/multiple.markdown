---
order: 2
title: 多层单选与多选
desc: 与Tree结合的树下拉
---

````javascript
import React from 'react';
import { TreeSelect } from 'cloud-react';


export default class TreeSelectDemo extends React.Component {

    constructor(props) {
		super(props);
		
		this.state = {
			selectedNodes: [{
				id: 112,
				name: '删除两个',
				pId: 11
			}],
			confirmNodes:[{
				id: 112,
				name: '删除两个',
				pId: 11
			}],
			singleNodes:[{
				id: 112,
				name: '删除两个',
				pId: 11
			}]
		}
	}

    handleChange = (node, selectedNodes) => {
		console.log(node, selectedNodes);
		
		this.setState({
			selectedNodes
		})
	}
	
	onOk = (node, selectedNodes) => {
		console.log(node, selectedNodes);
		
		this.setState({
			confirmNodes: selectedNodes
		})
	}

	onChangeSingle = (node, selectedNodes) => {
		console.log(node, selectedNodes);
		
		this.setState({
			singleNodes: selectedNodes
		})
	}

	render() {

        const treeData = [
				{
					id: 11,
					name: '禁止删除节点',
					pId: 1,
					disableRemove: true,
					children: [
						{
							id: 111,
							name: '删除一个',
							pId: 11,
							children: []
						},
						{
							id: 112,
							name: '删除两个',
							pId: 11,
							children: []
						},
						{
							id: 113,
							name: '删除三个',
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
				},{
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
			];

		return (
			<div>
				<span style={{ marginBottom: 5, fontSize: 12 }}>多选：</span>
				<TreeSelect
					multiple
					style={{marginBottom: 20}}
					placeholder="选择一个选项"
					dataSource={treeData}
					value={this.state.selectedNodes}
					onChange={this.handleChange} />
				<TreeSelect
					multiple
					hasConfirmButton
					placeholder="选择一个选项"
					style={{marginBottom: 20}}
					dataSource={treeData}
					showIcon={false}
					value={this.state.confirmNodes}
					onOk={this.onOk} />
				<span style={{ marginBottom: 5, fontSize: 12 }}>单选：</span>
				<TreeSelect
					single
					placeholder="选择一个选项"
					dataSource={treeData}
					value={this.state.singleNodes}
					onChange={this.onChangeSingle} />
			</div>
		);
	}
}
````
