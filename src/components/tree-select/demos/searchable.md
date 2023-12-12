---
order: 2
title: 搜索
desc: 与Tree结合的树下拉
---

```jsx
import React from 'react';
import { TreeSelect, Checkbox } from 'cloud-react';

class TreeSelectDemo extends React.Component {
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
            selectedNodes: [],
            singleNodes: [],
            disabled: false,
		};
	}

	handleChange = (node, selectedNodes) => {
		// console.log(node, selectedNodes);

		this.setState({
			selectedNodes
		});
	};

	onChangeSingle = (node, selectedNodes) => {
		// console.log(node, selectedNodes);

		this.setState({
			singleNodes: selectedNodes
		});
	};

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Checkbox checked={this.state.disabled} onChange={checked => {
                this.setState({ disabled: checked })
              }}>禁用</Checkbox>
              <div>
                <h5>单选搜索框在下拉框内</h5>
                <TreeSelect
                  searchable
                  searchInBox={false}
                  allowClear
                  disabled={this.state.disabled}
                  type="single"
                  isUnfold
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 328 }}
                  dataSource={this.treeData}
                  value={this.state.singleNodes}
                  onChange={this.onChangeSingle}
                />
              </div>
              <div>
                <h5>多选搜索框在下拉框内</h5>
                <TreeSelect
                  searchable
                  searchInBox={false}
                  allowClear
                  disabled={this.state.disabled}
                  type="multiple"
                  isUnfold
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 328 }}
                  dataSource={this.treeData}
                  value={this.state.selectedNodes}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <h5>单选搜索框在下拉框外（新）</h5>
                <TreeSelect
                  searchable
                  allowClear
                  disabled={this.state.disabled}
                  type="single"
                  isUnfold
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 328 }}
                  dataSource={this.treeData}
                  value={this.state.singleNodes}
                  onChange={this.onChangeSingle}
                />
              </div>
              <div>
                <h5>多选搜索框在下拉框外（新）</h5>
                <TreeSelect
                  searchable
                  allowClear
                  disabled={this.state.disabled}
                  type="multiple"
                  isUnfold
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 328 }}
                  dataSource={this.treeData}
                  value={this.state.selectedNodes}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <h5>多选限制标签数量（新）</h5>
                <TreeSelect
                  searchable
                  maxTagCount={1}
                  allowClear
                  disabled={this.state.disabled}
                  type="multiple"
                  isUnfold
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 328 }}
                  dataSource={this.treeData}
                  value={this.state.selectedNodes}
                  onChange={this.handleChange}
                />
              </div>
			</div>
		);
	}
}

export default TreeSelectDemo;
```
