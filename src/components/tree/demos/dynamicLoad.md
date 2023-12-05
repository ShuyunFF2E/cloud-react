---
order: 1
title: 基础用法
desc: 支持搜索节点、右键菜单、最大层级为4、节点名称最大长度20、可搜索关键字长度最大为20个字符、新增节点加到当前节点的子节点末尾，展开全部节点
---

```jsx

/**
 * title: 基础用法
 * desc: 支持搜索节点、右键菜单、最大层级为4、节点名称最大长度20、可搜索关键字长度最大为20个字符、新增节点加到当前节点的子节点末尾，展开全部节点
 */
import React from 'react';
import { Tree, Modal } from 'cloud-react';

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

class TreeDemo extends React.Component {
	constructor(props) {
		super(props);
        this.state = { selectedValue: [] };
	}

  selectedNode = (node, nodeList) => {
    console.log(node, nodeList);
    this.setState({ selectedValue: nodeList });
  }

	render() {
		return (
			<Tree
              selectedValue={this.state.selectedValue}
              onSelectedNode={this.selectedNode}
              isDynamicLoad
              supportCheckbox
              supportSearch
              treeData={treeData} 
              searchPlaceholder="动态加载节点"
              onLoadData={(data, node) => {
                return new Promise(resolve => {
                  setTimeout(() => {
                    node.children = [
                      {
                        id: `${node.id}1`,
                        name: '动态加载一个',
                        // title: <span style={{ color: 'red' }}>动态加载一个</span>,
                        pId: node.id,
                        level: node.level + 1,
                        children: [],
                        checked: node.checked,
                      },
                      {
                        id: `${node.id}2`,
                        name: '动态加载叶子节点',
                        pId: node.id,
                        isLeaf: true, // 无叶子节点需设置该属性
                        level: node.level + 1,
                        children: [],
                        checked: node.checked, // 父节点选中，子节点也选中
                      }
                    ];
                    resolve(data)
                  }, 2 * 1000);
                })
              }}
            />
		);
	}
}

export default TreeDemo;
```
