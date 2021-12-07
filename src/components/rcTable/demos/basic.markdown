---
order: 1
title: RcTable
desc: 默认样式
---

```javascript
import React, { useState, useEffect } from 'react';
import { RcTable, Checkbox } from 'cloud-react';

const columns = [
    { title: 'title1', dataIndex: 'a', key: 'a', width: 100, align: 'left', fixed: 'left' },
    { title: 'title2', dataIndex: 'b', key: 'b', width: 100, align: 'left', ellipsis: true, fixed: 'left' },
    { title: 'title3', dataIndex: 'c', key: 'c', width: 200, align: 'left' },
    { title: 'title4', dataIndex: 'b', key: 'd', width: 200, align: 'left' },
    { title: 'title5', dataIndex: 'b', key: 'e', width: 200, align: 'left' },
    { title: 'title6', dataIndex: 'b', key: 'f', width: 200, align: 'left' },
    // {
    //     title: (
    //         <div>
    //             title7
    //             <br />
    //             <br />
    //             <br />
    //             Hello world!
    //         </div>
    //     ),
    //     dataIndex: 'b',
    //     key: 'g',
    // },
    { title: 'title8', dataIndex: 'b', key: 'h', width: 200, align: 'left' },
    { title: 'title9', dataIndex: 'b', key: 'i', width: 200, align: 'left' },
    { title: 'title10', dataIndex: 'b', key: 'j', width: 200, align: 'left' },
    // { title: 'title11', dataIndex: 'b', key: 'k', width: 50 },
    { title: 'title12', dataIndex: 'b', key: 'l', width: 100, align: 'left', fixed: 'right' },
];
const data = [
    { a: 'cdd', b: 'edd12221', d: 3, key: '2' },
    { a: '133', c: 'edd12221', d: 2, key: '3' },
    { a: '133', c: 'edd12221', d: 2, key: '4' },
    { a: '133', c: 'edd12221', d: 2, key: '5' },
    { a: '133', c: 'edd12221', d: 2, key: '6' },
    { a: '133', c: 'edd12221', d: 2, key: '7' },
    { a: '133', c: 'edd12221', d: 2, key: '8' },
    { a: '133', c: 'edd12221', d: 2, key: '9' },
    {
        a: '123',
        b: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        d: 3,
        key: '1',
    },
];

const data1 = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    { name: 'Rose', age: 36, address: 'some where', key: '2' },
    { name: 'Rose', age: 36, address: 'some where', key: '3' },
    { name: 'Rose', age: 36, address: 'some where', key: '4' },
    { name: 'Rose', age: 36, address: 'some where', key: '5' },
    { name: 'Rose', age: 36, address: 'some where', key: '6' },
    { name: 'Rose', age: 36, address: 'some where', key: '7' },
    { name: 'Rose', age: 36, address: 'some where', key: '8' },
    { name: 'Rose', age: 36, address: 'some where', key: '9' },
];
const columns1 = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        width: 100,
        // fixed: 'left',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: 'left',
        width: 100,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'left',
        width: 200,
    },
    {
        title: 'Operations',
        dataIndex: '',
        key: 'operations',
        align: 'left',
        width: 200,
        render: () => <a href="#">Delete</a>,
        // fixed: 'right',
    },
];

export default function RcTableDemo() {
    const [smallChecked, setSmallChecked] = useState(false);
    const [supportExpend, setSupportExpend] = useState(true);
    const size = smallChecked ? 'small' : 'default';
    
    const commonProps = {
        size,
        supportExpend,
        expandedRowRender: () => '啦啦啦'
    };

	return (
        <div>
            <Checkbox style={{ marginBottom: 20 }} checked={smallChecked} onChange={() => {
                setSmallChecked(!smallChecked);
            }}>small size</Checkbox>
            <Checkbox style={{ marginBottom: 20, marginLeft: 15 }} checked={supportExpend} onChange={() => {
                setSupportExpend(!supportExpend);
            }}>support expend</Checkbox>
            <RcTable
                {...commonProps}
                style={{ width: '100%', height: 200 }}
                columnData={columns1}
                ajaxData={data1.slice(0, 2)}
            />
            <div style={{ height: 20 }} />
            <RcTable
                {...commonProps}
                bordered
                style={{ width: '100%', height: 200 }}
                columnData={columns1}
                ajaxData={data1.slice(0, 2)}
            />
            <div style={{ height: 20 }} />
            <RcTable
                {...commonProps}
                bordered
                style={{ width: '100%', height: 400 }}
                columnData={columns1}
                ajaxData={data1}
            />
            <div style={{ height: 20 }} />
            <RcTable
                {...commonProps}
                bordered
                style={{ width: '100%', height: 400 }}
                columnData={columns}
                ajaxData={data}
            />
        </div>
	);
}
```
