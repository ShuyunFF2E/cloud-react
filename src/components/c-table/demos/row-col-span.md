---
order: 1
title: CTable
desc: 合并列 & 合并行
---

```jsx
import React from "react";
import { CTable, Button } from "cloud-react";

const data = [
  { a: "13812340987", b: "0571-12345678", c: "张三", d: "贞观路", e: "男" },
  { a: "13812340986", b: "0571-98787658", c: "张夫人", d: "长安路", e: "女" },
  { a: "13812988888", b: "0571-099877", c: "李四", d: "丈八东路", e: "男" },
  { a: "1381200008888", b: "0571-099877", c: "王五", d: "高新三路", e: "男" },
  { a: "0571-88888110", c: "李警官", d: "高新四路", e: "男" },
  { a: "资料统计完毕于2022年3月3日" },
];

const columns = [
  {
    title: "手机号",
    dataIndex: "a",
    colSpan: 2,
    key: "a",
    onCell: (_, index) => {
      const props = {};

      // 非表头的第5行合并两列
      if (index === 4) {
        props.colSpan = 2;
      }

      // 非表头的第6行合并六列
      if (index === 5) {
        props.colSpan = 6;
      }

      return props;
    },
  },
  {
    title: "电话",
    dataIndex: "b",
    colSpan: 0,
    key: "b",
    onCell(_, index) {
      // 非表头的第5行和第6行：合并掉的列设置colSpan=0，代表这两列不会去渲染
      if (index === 4 || index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: "姓名",
    dataIndex: "c",
    key: "c",
    onCell(_, index) {
      // 非表头的第6行：合并掉的列设置colSpan=0，代表这一列不会去渲染
      if (index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: "地址",
    dataIndex: "d",
    key: "d",
    onCell(_, index) {
      const props = {};
      // 设置 index === 0 的 rowSpan = 3：代表非表头的第一行，该列合并三行
      if (index === 0) {
        props.rowSpan = 3;
      }
      // 设置 index === 1 || index === 2 的 props.rowSpan = 0，代表被合并的第二行和第三行不会去渲染
      if (index === 1 || index === 2) {
        props.rowSpan = 0;
      }
      // 非表头的第6行：合并掉的列设置colSpan=0，代表这一列不会去渲染
      if (index === 5) {
        props.colSpan = 0;
      }
      return props;
    },
  },
  {
    title: "性别",
    dataIndex: "e",
    key: "e",
    onCell(_, index) {
      // 非表头的第6行：合并掉的列设置colSpan=0，代表这一列不会去渲染
      if (index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: "操作",
    dataIndex: "",
    key: "f",
    render() {
      return (
        <Button type="link" size="small" style={{ padding: "0 6px 0 0" }}>
          查看详情
        </Button>
      );
    },
    onCell(_, index) {
      if (index === 5) {
        return {
          colSpan: 0,
        };
      }
      return {};
    },
  },
];

export default function CTableDemo() {
  return (
    <CTable
      bordered
      columnData={columns}
      ajaxData={{ totals: data.length, data }}
    />
  );
}
```
