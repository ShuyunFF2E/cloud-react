---
order: 8
title: RcTable
desc: 树状表格
---

```jsx

/**
 * title: 树状表格
 * desc: 树状表格
 */
import React from 'react';
import RcTable from '../index';

const data = [
    {
        key: 1,
        name: '一级条目1',
        age: 32,
        address: 'I am a',
        children: [
            {
                key: 11,
                name: '二级条目11',
                age: 33,
                address: 'I am aa',
            },
            {
                key: 12,
                name: '二级条目12',
                age: 33,
                address: 'I am ab',
                children: [
                    {
                        key: 121,
                        name: '二级条目121',
                        age: 33,
                        address: 'I am aba',
                    },
                ],
            },
            {
                key: 13,
                name: '二级条目13',
                age: 33,
                address: 'I am ac',
                children: [
                    {
                        key: 131,
                        name: '三级条目131',
                        age: 33,
                        address: 'I am aca',
                        children: [
                            {
                                key: 1311,
                                name: '四级条目1311',
                                age: 33,
                                address: 'I am acaa',
                            },
                            {
                                key: 1312,
                                name: '四级条目1312',
                                age: 33,
                                address: 'I am acab',
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
        age: 32,
        address: 'I am b',
    },
    {
        key: 3,
        name: '一级条目3',
        age: 32,
        address: 'I am c',
        children: [
            {
                key: 31,
                name: '二级条目31',
                age: 33,
                address: 'I am ca',
            }
        ],
    },
    {
        key: 4,
        name: '一级条目4',
        age: 32,
        address: 'I am d',
        children: [
            {
                key: 41,
                name: '二级条目42',
                age: 33,
                address: 'I am da',
            }
        ],
    },
];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'left',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        align: 'left',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        align: 'left',
    },
    {
        title: 'Operations',
        dataIndex: 'operation',
        align: 'left',
    },
];

export default function RcTableDemo() {
	return (
        <RcTable
            supportExpend
            supportTree
            supportCheckbox
            keyField="key"
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
