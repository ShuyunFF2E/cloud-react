---
order: 1 title: CTable desc: 默认表格
---

```jsx
import React from "react";
import { CTable } from "cloud-react";

const data = new Array(10).fill(1).map((item, index) => ({
  id: 121410327 + index,
  name: "手机号优先继续发送1",
  createTime: "2021/12/14 10:19:02",
  creator: "liyuan.meng",
  num: 12222,
}));

const columns = [
  { title: "活动ID", dataIndex: "id", width: 130 },
  { title: "活动名称", dataIndex: "name", width: 140 },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 140,
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  {
    title: "人数",
    dataIndex: "num",
    align: "right",
    width: 120,
    render: (val) => <CTable.NumberTpl value={val} precision={0} />,
  },
  { title: "创建人", dataIndex: "creator", width: 130 },
];

export default function CTableDemo() {
  return (
    <CTable
      sticky={{
        offsetHeader: 64,
      }}
      stickyFooter
      supportPage
      columnData={columns}
      ajaxData={{ totals: data.length, data }}
    />
  );
}
```
