---
order: 2
title: 多层单选与多选
desc: 与Tree结合的树下拉
---

```jsx
import React from 'react';
import { TreeSelect } from 'cloud-react';

const treeData = [
  {
    id: 1,
    name: '所有基础',
    pId: null,
    disableRemove: true,
    disableRename: true,
    children: [
      {
        id: 11,
        name: '禁止删除节点',
        pId: 1,
        disableRemove: true,
        children: [],
      },
      {
        id: 12,
        name: '禁止新增节点',
        pId: 1,
        disableAdd: true,
        children: [],
      },
      {
        id: 13,
        name: '禁止重命名节点',
        pId: 1,
        disableRename: true,
        children: [],
      },
      {
        id: 14,
        name: '未分类',
        pId: 1,
        disableRemove: true,
        disableAdd: true,
        disableRename: true,
        isLeaf: true,
      }
    ]
  }
];

function findNodeById(nodeId, data) {
  let targetNode = null;

  const fn = node => {
    if (node?.children?.length) {
      node?.children?.forEach(fn);
      if (node.id === nodeId) {
        targetNode = node;
      }
    } else {
      if (node.id === nodeId) {
        targetNode = node;
      }
    }
  };

  data.find(fn)
  return targetNode;
}

class TreeSelectDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            treeData: JSON.parse(JSON.stringify(treeData)),
            treeData1: JSON.parse(JSON.stringify(treeData)),
            selectedNodes: [],
			singleNodes: []
		};
	}

	onChangeSingle = (node, selectedNodes) => {
		this.setState({
			singleNodes: selectedNodes
		});
	};

      handleChange = (node, selectedNodes) => {
        this.setState({
          selectedNodes
        });
      };

	render() {
      return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h5>单选</h5>
                <TreeSelect
                  searchable
                  allowClear
                  type="single"
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 420, maxWidth: 420 }}
                  dropdownStyle={{ maxWidth: 420 }}
                  dataSource={this.state.treeData}
                  value={this.state.singleNodes}
                  onChange={this.onChangeSingle}
                  isDynamicLoad
                  onLoadData={(data, node) => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        node.children = [
                          {
                            id: `${node.id}1`,
                            name: '动态加载一个',
                            pId: node.id,
                            level: node.level + 1,
                            children: [],
                          },
                          {
                            id: `${node.id}2`,
                            name: '动态加载叶子节点',
                            pId: node.id,
                            isLeaf: true,
                            level: node.level + 1,
                            children: [],
                          }
                        ];

                        // 更新 dataSouce
                        const targetNode = findNodeById(node.id, this.state.treeData);
                        targetNode.children = node.children;

                        resolve(data)
                      }, 1 * 1000);
                    })
                  }}
                />
              </div>
              <div>
                <h5>多选</h5>
                <TreeSelect
                  searchable
                  allowClear
                  type="multiple"
                  containParentNode
                  placeholder="选择一个选项"
                  style={{ width: 420, maxWidth: 420 }}
                  dropdownStyle={{ maxWidth: 420 }}
                  dataSource={this.state.treeData1}
                  value={this.state.selectedNodes}
                  onChange={this.handleChange}
                  isDynamicLoad
                  onLoadData={(data, node) => {
                    return new Promise(resolve => {
                      setTimeout(() => {
                        node.children = [
                          {
                            id: `${node.id}1`,
                            name: '动态加载一个',
                            pId: node.id,
                            level: node.level + 1,
                            children: [],
                          },
                          {
                            id: `${node.id}2`,
                            name: '动态加载叶子节点',
                            pId: node.id,
                            isLeaf: true,
                            level: node.level + 1,
                            children: [],
                          }
                        ];

                        // 更新 dataSouce
                        const targetNode = findNodeById(node.id, this.state.treeData1);
                        targetNode.children = node.children;

                        resolve(data)
                      }, 1 * 1000);
                    })
                  }}
                />
              </div>
			</div>
		);
	}
}

export default TreeSelectDemo;
```
