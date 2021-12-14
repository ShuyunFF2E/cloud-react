---
order: 4
title: RcTable
desc: 固定列
---

```jsx

/**
 * title: 固定列
 * desc: 固定列
 */
import React, { useState, useEffect } from 'react';
import RcTable from '../index';
import Button from '../../button/index';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', approver: 'admin', status: '执行完成' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', approver: 'admin', status: '执行中' },
    { id: '121410328', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', approver: 'admin', status: '待审批' },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', approver: 'admin', status: '执行完成' },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', approver: 'admin', status: '执行错误' },
    { id: '121407192', name: '继续发送手机4', createTime: '2021/12/13 11:03:07', creator: 'han.wu', approver: 'admin', status: '终止' },
    { id: '121407193', name: '继续发送手机5', createTime: '2021/12/13 11:03:34', creator: 'yue.ren', approver: 'admin', status: '执行完成' },
    { id: '121407194', name: '继续发送手机6', createTime: '2021/12/13 11:03:05', creator: 'wanjuan.dong', approver: 'admin', status: '设计中' },
    { id: '121407195', name: '继续发送手机7', createTime: '2021/12/13 11:03:55', creator: 'ying.yan', approver: 'admin', status: '执行完成' },
    { id: '121407196', name: '继续发送手机8', createTime: '2021/12/13 11:03:23', creator: 'xian.yong', approver: 'admin', status: '执行完成' },
];

const columns = [
    { title: '活动ID', dataIndex: 'id', align: 'left', width: 200, fixed: 'left' },
    { title: '活动名称', dataIndex: 'name', align: 'left', width: 200 },
    { title: '创建时间', dataIndex: 'createTime', align: 'left', width: 200 },
    { title: '创建人', dataIndex: 'creator', align: 'left', width: 200 },
    { title: '审批人', dataIndex: 'approver', align: 'left', width: 300 },
    { title: '活动状态', dataIndex: 'status', align: 'left' },
    { 
        title: '操作',
        dataIndex: 'operator',
        render: () => (
            <div>
                <Button type="link" size="small">编辑</Button>
                <Button type="link" size="small">删除</Button>
                <Button type="link" size="small">查看报告</Button>
            </div>
        ),
        width: 300,
        fixed: 'right'
    }
];

export default function RcTableDemo() {
	return (
        <RcTable
            style={{ width: '100%', height: 260 }}
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
        />
	);
}
```
