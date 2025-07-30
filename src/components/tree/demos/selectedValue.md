---
order: 8
title: 数据回显（单选）
desc: 回显已经选择的数据
---

```jsx
/**
 * title: 数据回显（单选）
 * desc: 回显已经选择的数据
 */
import React from "react";
import { Tree } from "cloud-react";

class TreeDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: [
        {
          id: 12,
          name: "禁止删除节点",
          pId: 1,
        },
      ],
    };
  }

  selectedNode = (node, selectedList) => {
    console.info("已选择一个节点，节点信息是：");
    console.log(node);
    console.info("目前已选择节点列表，列表信息是：");
    console.log(selectedList);
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
              },
            ],
          },
          {
            id: 12,
            name: "禁止删除节点",
            pId: 1,
            disableRemove: true,
            children: [
              {
                id: 121,
                name: "禁止重命名节点",
                pId: 12,
                disableRename: false,
                children: [
                  {
                    id: 1211,
                    name: "2345",
                    pId: 121,
                  },
                ],
              },
              {
                id: 122,
                name: "lerous",
                pId: 12,
                disableSelected: true,
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
        selectedValue={this.state.selectedValue}
        onSelectedNode={this.selectedNode}
      />
    );
  }
}

export default TreeDemo;
```
