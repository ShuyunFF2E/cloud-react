---
order: 5
title: CTable
desc: 自定义列模板
---

```jsx

/**
 * title: 自定义表格列模板
 * desc: 自定义表格列模板（操作图标）
 */
import React, { useState } from 'react';
import { CTable, Icon, Tooltip } from 'cloud-react';

export default function CTableDemo() {
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
              const iconStyle = {
                paddingRight: 16,
                cursor: 'pointer'
              };
              return (
                <div className="custom-operate" style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.45)' }}>
                  <Icon style={iconStyle} type="export" />
                  <Icon style={iconStyle} type="config" />
                  <Icon style={iconStyle} type="copy" />
                  <Icon style={iconStyle} type="delete" />
                </div>
              )
            },
        }
    ];
	return (
        <CTable
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
        />
	);
}
```
