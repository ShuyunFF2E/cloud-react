---
order: 10
title: 自定义配置样式
desc: 使用className或style属性自定义配置样式
---

```jsx
/**
 * title: 自定义配置样式
 * desc: 使用className或style属性自定义配置样式
 */
import React from "react";
import { Tree } from "cloud-react";
import "./styles/defineStyle.less";
class TreeDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showIcon: false,
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
        name: "我是根节点",
        pId: null,
        children: [
          {
            id: 11,
            name: "这里将会是一个超级超级长的节点，这个节点名称也会超级超级长，毕竟是为了测试极端情况下的样式问题",
            pId: 1,
            disableAdd: true,
            children: [
              {
                id: 111,
                name: "123456789101112312423423",
                pId: 11,
                categoryType: 0,
              },
            ],
          },
          {
            id: 12,
            name: "别删除我，你删不掉11",
            pId: 1,
            disableRemove: true,
            children: [
              {
                id: 121,
                name: "说了你还不信121",
                pId: 12,
                disableRename: true,
                children: [
                  {
                    id: 1211,
                    name: "我爷爷说了，你试试！",
                    pId: 121,
                  },
                ],
              },
              {
                id: 122,
                name: "咳咳咳",
                pId: 12,
              },
              {
                id: 123,
                name: "哈哈哈",
                pId: 12,
              },
              {
                id: 124,
                name: "嘿嘿嘿",
                pId: 12,
              },
              {
                id: 125,
                name: "吼吼吼",
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
    const style = {
      color: "#333",
      width: "200px",
      background: "rgb(249,249,249)",
      border: "1px solid #EEE",
    };

    return (
      <Tree
        supportMenu
        menuType="dialogMenu"
        isUnfold
        treeData={treeData}
        style={style}
        className="bg"
        showIcon={this.state.showIcon}
        onSelectedNode={this.selectedNode}
      />
    );
  }
}

export default TreeDemo;
```
