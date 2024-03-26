---
order: 2
title: 多层单选与多选
desc: 与Tree结合的树下拉
---

```jsx
import React from 'react';
import { TreeSelect } from 'cloud-react';

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
			selectedNodes: [
              {
                id: 11321,
                name: '禁止删除节点321',
                pId: 1132,
                children: []
              }
			],
			confirmNodes: [],
			singleNodes: [
              {
                id: 11321,
                name: '禁止删除节点321',
                pId: 1132,
                children: []
              }
			]
		};
        // setTimeout(() => {
        //    this.setState({
        //       confirmNodes: [this.treeData[0]]
        //    });
        // }, 1000);

	}

	handleChange = (node, selectedNodes) => {
		console.log(node, selectedNodes);

		this.setState({
			selectedNodes
		});
	};

      handleConfirmChange = (node, selectedNodes) => {
        console.log(node, selectedNodes);
    
        this.setState({
          confirmNodes: selectedNodes
        });
      };

	onOk = (node, selectedNodes) => {
		console.log(node, selectedNodes);

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
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h5>单选</h5>
                <TreeSelect
                  allowClear
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
                <h5>多选</h5>
                <TreeSelect
                  allowClear
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
                  <h5>带确认按钮</h5>
                  <TreeSelect
                    type="multiple"
                    hasConfirmButton
                    isUnfold
                    allowClear
                    placeholder="选择一个选项"
                    style={{ width: 328 }}
                    footerTypes={['ok', 'reset']}
                    dataSource={this.treeData}
                    showIcon={false}
                    value={this.state.confirmNodes}
                    onChange={this.handleConfirmChange}
                    onOk={this.onOk}
                  />
                </div>
			</div>
		);
	}
}

export default TreeSelectDemo;
```
