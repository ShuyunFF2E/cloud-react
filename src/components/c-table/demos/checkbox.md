---
order: 7
title: RcTable
desc: 多选
---

```jsx

/**
 * title: 多选表格
 * desc: 多选表格
 */
import React from 'react';
import RcTable from '../index';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
    { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
];

const columns = [
    { title: '活动ID', dataIndex: 'id', align: 'left' },
    { title: '活动名称', dataIndex: 'name', align: 'left' },
    { title: '创建时间', dataIndex: 'createTime', align: 'left' },
    { title: '创建人', dataIndex: 'creator', align: 'left' }
];

export default function RcTableDemo() {
	return (
        <RcTable
            supportCheckbox
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
            checkedData={data.slice(1, 4)}
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
