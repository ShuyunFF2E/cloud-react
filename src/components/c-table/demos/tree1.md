---
order: 8
title: CTable
desc: 树状表格（多级）
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
    {
        key: 1,
        name: '一级条目1',
        id: 123456,
        details: '一级条目1详情',
        skus: [
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
                skus: [
                    {
                        key: 121,
                        name: '三级条目131',
                        id: 123459,
                        details: '三级条目131详情',
                    },
                ],
            },
            {
                key: 13,
                name: '二级条目13',
                id: 123460,
                details: '二级条目13详情',
                skus: [
                    {
                        key: 131,
                        name: '三级条目131',
                        id: 123461,
                        details: '三级条目131详情',
                        skus: [
                            {
                                key: 1311,
                                name: '四级条目1311',
                                id: 123462,
                                details: '四级条目1311详情',
                            },
                            {
                                key: 1312,
                                name: '四级条目1312',
                                id: 123463,
                                details: '四级条目1312详情',
                            },
                        ],
                    },
                ],
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
        skus: [
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
        skus: [
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
            style={{ width: '100%', height: 230 }}
            supportExpend
            supportTree
            supportCheckbox
            rowKey="key"
            childrenKey="skus"
            checkedData={[data[0].skus[0], data[1]]}
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
