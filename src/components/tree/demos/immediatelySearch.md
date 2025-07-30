---
order: 7
title: 支持实时搜索
desc: 支持实时搜索，在搜索框输入内容时进行搜索
---

```jsx
/**
 * title: 支持实时搜索
 * desc: 支持实时搜索，在搜索框输入内容时进行搜索
 */
import React from "react";
import { Tree } from "cloud-react";

class TreeDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      supportSearch: true,
      supportImmediatelySearch: true,
    };
  }

  selectedNode = (node) => {
    console.info("已选择一个节点，节点信息是：");
    console.log(node);
  };

  searchResult = (searchValue, searchResult) => {
    console.info("搜索的值是：");
    console.log(searchValue);
    console.info("搜索的结果是：");
    console.log(searchResult);
  };

  render() {
    const treeData = [
      {
        id: 1,
        name: "所有",
        pId: null,
        children: [
          {
            id: 11,
            name: "禁止新增节点",
            pId: 1,
            disableAdd: true,
            children: [
              {
                id: 111,
                name: "22323",
                pId: 11,
                categoryType: 0,
                children: [
                  {
                    id: 1111,
                    name: "2333",
                    pId: 111,
                    categoryType: 0,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 12,
            name: "0414禁止删除节点",
            pId: 1,
            disableRemove: true,
            children: [
              {
                id: 121,
                name: "0414禁止重命名节点",
                pId: 12,
                disableRename: true,
                children: [
                  {
                    id: 1211,
                    name: "04142345",
                    pId: 121,
                  },
                  {
                    id: 1212,
                    name: "42345",
                    pId: 121,
                  },
                ],
              },
              {
                id: 122,
                name: "lerous",
                pId: 12,
              },
              {
                id: 123,
                name: "baukh321",
                pId: 12,
              },
              {
                id: 124,
                name: "bauh789",
                pId: 12,
              },
              {
                id: 125,
                name: "baukh",
                pId: 12,
              },
            ],
          },
          {
            id: 13,
            name: "未分类",
            pId: 1,
          },
        ],
      },
    ];
    return (
      <Tree
        treeData={treeData}
        supportMenu={this.state.supportMenu}
        supportSearch={this.state.supportSearch}
        supportImmediatelySearch={this.state.supportImmediatelySearch}
        onSearchNode={this.searchResult}
        onSelectedNode={this.selectedNode}
      ></Tree>
    );
  }
}

export default TreeDemo;
```
