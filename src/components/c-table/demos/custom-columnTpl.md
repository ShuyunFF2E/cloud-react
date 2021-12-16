---
order: 5
title: RcTable
desc: 自定义列模板
---

```jsx

/**
 * title: 自定义表格列模板
 * desc: 自定义表格列模板
 */
import React, { useState } from 'react';
import RcTable from '../index';
import Input from '../../input/index';
import Tooltip from '../../tooltip/index';

export default function RcTableDemo() {
    const [creator, setCreator] = useState('');

    const data = [
        { id: '121410327', name: '手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
        { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
        { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
        { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
        { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
    ];

    const columns = [
        { 
            title: '活动ID',
            dataIndex: 'id',
            align: 'left',
        },
        { 
            title: '活动名称',
            dataIndex: 'name',
            align: 'left',
            ellipsis: true,
            render: (value) => {
                return (
                    <Tooltip content={value} placement="top-left">
                        {value}
                    </Tooltip>
                )
            }
        },
        { 
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'left'
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            align: 'left',
            width: 200,
            render: () => {
                return <Input
                    style={{ width: 140 }}
                    value={creator}
                    onChange={evt => {
                        setCreator(evt.target.value)
                    }}
                />
            }
        }
    ];
	return (
        <RcTable
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
        />
	);
}
```
