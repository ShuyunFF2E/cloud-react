---
order: 1
title: 基础用法
desc: 支持搜索节点、右键菜单、最大层级为4、节点名称最大长度20、可搜索关键字长度最大为20个字符、新增节点加到当前节点的子节点末尾，展开全部节点
---

```jsx
import React from "react";
import { Tree, Modal, Radio } from "cloud-react";

const treeData = [
  {
    id: 1,
    name: "所有基础",
    pId: null,
    disableRemove: true,
    disableRename: true,
    children: [
      {
        id: 11,
        name: "节点11",
        pId: 1,
        disableRemove: true,
        children: [
          {
            id: 111,
            name: "节点11-1",
            title: <span style={{ color: "red" }}>删除一个3</span>,
            pId: 11,
            children: [],
          },
          {
            id: 112,
            name: "节点11-2",
            pId: 11,
            children: [],
          },
          {
            id: 113,
            name: "节点11-3",
            pId: 11,
            children: [
              {
                id: 1131,
                name: "节点11-3-1",
                pId: 113,
                children: [],
              },
              {
                id: 1132,
                name: "节点11-3-2",
                pId: 113,
                children: [
                  {
                    id: 11321,
                    name: "节点11-3-2-1",
                    pId: 1132,
                    children: [
                      {
                        id: 113211,
                        name: "节点11-3-2-1-1",
                        pId: 11321,
                        children: [],
                      },
                      {
                        id: 113212,
                        name: "节点11-3-2-1-2",
                        pId: 11321,
                        children: [],
                      },
                    ],
                  },
                  {
                    id: 11322,
                    name: "节点11-3-2-2",
                    pId: 1132,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 114,
            name: "节点11-4",
            pId: 11,
            children: [],
          },
        ],
      },
      {
        id: 12,
        name: "节点12",
        pId: 1,
        disableAdd: true,
        children: [
          {
            id: 121,
            name: "节点12-1",
            pId: 12,
            children: [
              {
                id: 1211,
                name: "节点12-1-1",
                pId: 121,
                children: [],
              },
              {
                id: 1212,
                name: "节点12-1-2",
                pId: 121,
                children: [],
              },
              {
                id: 1213,
                name: "节点12-1-3",
                pId: 121,
                children: [],
              },
            ],
          },
          {
            id: 122,
            name: "节点12-2",
            pId: 12,
            children: [
              {
                id: 1221,
                name: "节点12-2-1",
                pId: 122,
                children: [],
              },
              {
                id: 1222,
                name: "节点12-2-2",
                pId: 122,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 13,
        name: "节点13",
        pId: 1,
        disableRename: true,
        children: [
          {
            id: 131,
            name: "节点13-1",
            pId: 13,
            children: [
              {
                id: 1311,
                name: "节点13-1-1",
                pId: 131,
                children: [],
              },
              {
                id: 1312,
                name: "节点13-1-2",
                pId: 131,
                children: [],
              },
              {
                id: 1313,
                name: "节点13-1-3",
                pId: 131,
                children: [],
              },
            ],
          },
          {
            id: 132,
            name: "节点13-2",
            pId: 13,
            children: [
              {
                id: 1321,
                name: "节点13-2-1",
                pId: 132,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 14,
        name: "未分类",
        pId: 1,
        disableRemove: true,
        disableAdd: true,
        disableRename: true,
        children: [],
      },
    ],
  },
];

class TreeDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lineType: "default" };
  }

  render() {
    return (
      <div>
        <Radio.Group
          value={this.state.lineType}
          onChange={(v) => this.setState({ lineType: v })}
          style={{ marginLeft: 24, marginBottom: 20 }}
        >
          <Radio value="default">实线</Radio>
          <Radio value="dashed">虚线</Radio>
        </Radio.Group>
        <Tree
          isUnfold
          treeData={treeData}
          showLine
          lineType={this.state.lineType}
        />
      </div>
    );
  }
}

export default TreeDemo;
```
