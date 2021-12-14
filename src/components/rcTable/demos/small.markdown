---
order: 10
title: RcTable
desc: 紧凑型
---

```javascript
import React, { useState, useEffect } from 'react';
import { RcTable, Checkbox, Button } from 'cloud-react';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', key: '121410327' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', key: '121410328' },
    { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', key: '121410329' },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', key: '121408294' },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', key: '121407191' },
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
            size="small"
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
        />
	);
}
```
