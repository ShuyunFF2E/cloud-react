---
order: 5
title: 顶部通栏
desc: topFullColumn使用介绍
---

```jsx
/**
 * title: 顶部通栏
 * desc: topFullColumn使用介绍
 */
import React, { Component } from "react";
import { Table } from "cloud-react";

// 唯一标识符，该值不允许重复
const gridManagerName = "top-full-table";

const columnData = [
  {
    key: "title",
    remind: "the title",
    text: "标题",
  },
  {
    key: "readNumber",
    text: "阅读量",
    width: "150px",
    align: "center",
  },
  {
    key: "info",
    text: "简介",
  },
];

const fullColumn = {
  interval: 6,
  topTemplate: (row, index) => {
    return (
      <div style={{ padding: "12px", textAlign: "center" }}>
        {index} -
        快速、灵活的对Table标签进行实例化，让Table标签充满活力。该项目已开源,
        <a target="_blank" href="https://github.com/baukh789/GridManager">
          点击进入
        </a>
        github
      </div>
    );
  },
};
class TableDemo extends Component {
  render() {
    return (
      <Table
        gridManagerName={gridManagerName}
        ajaxData="https://www.lovejavascript.com/blogManager/getBlogList"
        ajaxType="POST"
        disableBorder={true}
        columnData={columnData}
        supportAjaxPage={true}
        supportAutoOrder={false}
        supportCheckbox={false}
        fullColumn={fullColumn}
      />
    );
  }
}
export default TableDemo;
```
