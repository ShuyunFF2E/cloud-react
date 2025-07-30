---
order: 1
title: CTable
desc: 表头带线条
---

```jsx
import React from "react";
import { CTable } from "cloud-react";

const data = [
  {
    id: "121410327",
    name: "手机号优先继续发送1",
    createTime: "2021/12/14 10:19:02",
    creator: "liyuan.meng",
  },
  {
    id: "121410328",
    name: "ouid疲劳度3",
    createTime: "2021/12/13 15:47:33	",
    creator: "jiaojiao.diao",
  },
  {
    id: "121410329",
    name: "继续发送手机1",
    createTime: "2021/12/13 15:36:42",
    creator: "nan.run",
  },
  {
    id: "121408294",
    name: "继续发送手机2",
    createTime: "2021/12/13 11:14:40",
    creator: "xiaotong.fan",
  },
  {
    id: "121407191",
    name: "继续发送手机3",
    createTime: "2021/12/13 11:03:05",
    creator: "zhenxiao.guo",
  },
];

const columns = [
  { title: "活动ID", dataIndex: "id", width: 130 },
  {
    title: "活动名称",
    dataIndex: "name",
    width: 140,
    render: (val) => {
      return <CTable.TextTpl value={val} />;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 140,
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  { title: "创建人", dataIndex: "creator", width: 130 },
];

export default function CTableDemo() {
  return (
    <div style={{ width: "100%" }}>
      <CTable
        headerBordered
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}
```
