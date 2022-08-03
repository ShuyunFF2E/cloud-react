---
order: 8
title: CTable
desc: 表格分组
---

```jsx

/**
 * title: 表格分组
 * desc: 表格分组
 */
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
    {
        key: 1,
        name: '一级条目1',
        id: '',
        details: '',
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
    key: 3,
    name: '一级条目3',
    id: '',
    details: '',
    children: [
      {
        key: 31,
        name: '二级条目31',
        id: 123499,
        details: '二级条目31详情',
      }
    ],
  },
    {
        key: 4,
        name: '一级条目4',
        id: '',
        details: '',
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
        width: 300,
    },
    {
        title: '类目ID',
        dataIndex: 'id',
        align: 'left',
        width: 300,
    },
    {
        title: '详情',
        dataIndex: 'details',
        align: 'left',
        width: 300,
    },
];

export default function CTableDemo() {
	return (
        <CTable
            supportExpend
            supportTree
            rowKey="key"
            supportGroup
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
