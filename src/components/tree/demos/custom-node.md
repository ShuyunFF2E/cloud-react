---
order: 1
title: 自定义节点
desc: 自定义节点
---

```jsx
import React, { createRef } from "react";
import { Tree, Modal, Button } from "cloud-react";

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
        name: "禁止删除节点",
        pId: 1,
        disableRemove: true,
        children: [
          {
            id: 111,
            name: "删除一个3",
            title: <span style={{ color: "red" }}>删除一个3</span>,
            pId: 11,
            children: [],
          },
          {
            id: 112,
            name: "删除两个",
            pId: 11,
            children: [],
          },
          {
            id: 113,
            name: "删除三个",
            pId: 11,
            children: [
              {
                id: 1131,
                name: "禁止删除节点31",
                pId: 113,
                children: [],
              },
              {
                id: 1132,
                name: "禁止删除节点32",
                pId: 113,
                children: [
                  {
                    id: 11321,
                    name: "禁止删除节点321",
                    pId: 1132,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 114,
            name: "禁止删除节点4",
            pId: 11,
            children: [],
          },
        ],
      },
      {
        id: 12,
        name: "禁止新增节点",
        pId: 1,
        disableAdd: true,
        children: [
          {
            id: 121,
            name: "禁止新增节点1",
            pId: 12,
            children: [
              {
                id: 1211,
                name: "禁止新增节点11",
                pId: 121,
                children: [],
              },
              {
                id: 1212,
                name: "禁止新增节点12",
                pId: 121,
                children: [],
              },
              {
                id: 1213,
                name: "禁止新增节点13",
                pId: 121,
                children: [],
              },
            ],
          },
          {
            id: 122,
            name: "禁止新增节点2",
            pId: 12,
            children: [
              {
                id: 1221,
                name: "禁止新增节点21",
                pId: 122,
                children: [],
              },
              {
                id: 1222,
                name: "禁止新增节点22",
                pId: 122,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 13,
        name: "禁止重命名节点",
        pId: 1,
        disableRename: true,
        children: [
          {
            id: 131,
            name: "禁止重命名节点1",
            pId: 13,
            children: [
              {
                id: 1311,
                name: "禁止重命名节点11",
                pId: 131,
                children: [],
              },
              {
                id: 1312,
                name: "禁止重命名节点12",
                pId: 131,
                children: [],
              },
              {
                id: 1313,
                name: "禁止重命名节点13",
                pId: 131,
                children: [],
              },
            ],
          },
          {
            id: 132,
            name: "禁止重命名节点2",
            pId: 13,
            children: [
              {
                id: 1321,
                name: "禁止重命名节点21",
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

    this.ref = createRef();
    this.state = {
      searchPlaceholder: "这是最基础的树组件",
      searchMaxLength: 20,
      nodeNameMaxLength: 20,
      maxLevel: 4,
      supportMenu: true,
      supportSearch: true,
      isAddFront: false,
      selectedValue: null,
      treeData,
    };
  }

  addNode = (pId, name) => {
    console.info(
      "向后端发送一条请求，新增一个节点，参数为" +
        "pId:" +
        pId +
        "," +
        "name:" +
        name
    );
    return new Promise((resolve, reject) => {
      resolve({ data: Math.floor(Math.random() * 10000) });
      // reject('新增失败');
    });
  };

  renameNode = (id, name) => {
    console.info(
      "向后端发送一条请求，重命名一个节点，参数为" +
        "id:" +
        id +
        "," +
        "name:" +
        name
    );
    return new Promise((resolve, reject) => {
      resolve({ data: "重命名成功" });
      // reject('重命名失败');
    });
  };

  removeNode = (id, node) => {
    console.info("向后端发送一条请求，删除一个节点，参数为" + "id:" + id, node);
    return new Promise((resolve, reject) => {
      resolve({ data: "删除成功" });
      // reject('删除失败');
    });
  };

  selectedNode = (node) => {
    console.info("已选择一个节点，节点信息是：");
    console.log(node);
  };

  onDoubleClick = (node) => {
    Modal.confirm({
      body: "hello, 你双击了我，我会给你我的信息，请点击确定后在控制台查看",
      onOk: () => {
        console.log(node);
      },
    });
  };

  render() {
    return (
      <Tree
        ref={this.ref}
        selectedValue={this.state.selectedValue}
        treeData={this.state.treeData}
        searchPlaceholder={this.state.searchPlaceholder}
        searchMaxLength={this.state.searchMaxLength}
        nodeNameMaxLength={this.state.nodeNameMaxLength}
        maxLevel={this.state.maxLevel}
        isUnfold={true}
        breakCheckbox
        supportCheckbox
        supportMenu={this.state.supportMenu}
        supportSearch={this.state.supportSearch}
        isAddFront={this.state.isAddFront}
        onAddNode={this.addNode}
        onDoubleClick={this.onDoubleClick}
        onRenameNode={this.renameNode}
        onRemoveNode={this.removeNode}
        onSelectedNode={this.selectedNode}
        customNodeTpl={({
          node,
          addNode: _addNode,
          removeNode: _removeNode,
        }) => {
          return (
            <div
              style={{
                lineHeight: "30px",
                marginLeft: "auto",
                paddingRight: 20,
              }}
            >
              <Button
                type="text"
                style={{ marginRight: 15 }}
                disabled={!node?.children?.length}
                onClick={() => {
                  _addNode(node);
                }}
              >
                新增
              </Button>
              <Button
                type="text"
                disabled={!!node?.children?.length}
                onClick={() => {
                  _removeNode(node);
                }}
              >
                删除
              </Button>
            </div>
          );
        }}
      />
    );
  }
}

export default TreeDemo;
```
