---
order: 8
title: CTable
desc: 树状表格（两级）
---

```jsx

/**
 * title: 树状表格（两级）
 * desc: 树状表格（两级）
 */
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  {
    key: 1,
    name: '一级条目1',
    id: 123456,
    details: '一级条目1详情',
    children: [
      {
        key: 11,
        name: '二级条目11',
        id: 123457,
        details: '二级条目11详情',
      },
      {
        key: 12,
        name: '二级条目12',
        id: 123458,
        details: '二级条目12详情',
      },
      {
        key: 13,
        name: '二级条目13',
        id: 123460,
        details: '二级条目13详情',
      },
    ],
  },
  {
    key: 2,
    name: '一级条目2',
    id: 123464,
    details: '一级条目2详情',
  },
  {
    key: 3,
    name: '一级条目3',
    id: 123465,
    details: '一级条目3详情',
    children: [
      {
        key: 31,
        name: '二级条目31',
        id: 123466,
        details: '二级条目31详情',
      }
    ],
  },
  {
    key: 4,
    name: '一级条目4',
    id: 123467,
    details: '一级条目4详情',
    children: [
      {
        key: 41,
        name: '二级条目42',
        id: 123468,
        details: '二级条目42详情',
      }
    ],
  },
];
const columns = [
  {
    title: '类目名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '类目ID',
    dataIndex: 'id',
    align: 'left',
  },
  {
    title: '详情',
    dataIndex: 'details',
    align: 'left',
  },
];

export default function CTableDemo() {
	return (
        <CTable
            supportExpend
            supportTree
            supportCheckbox
            isExpendAloneColumn
            rowKey="key"
            checkedData={[data[0].children[0], data[1]]}
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
            onCheckedAfter={checkedList => {
                console.log('已选列表:', checkedList);
            }}
            onCheckedAllAfter={checkedList => {
                console.log('已选列表:', checkedList);
            }}
        />
	);
}
```
