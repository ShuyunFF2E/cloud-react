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
        { id: '121410327', name: '手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', category: [{ status: 'executing', text: '执行中' }] },
        { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', category: [{ status: 'success', text: '执行完成' }] },
        { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', category: [{ status: 'fail', text: '执行失败' }] },
        { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', category: [{ status: 'paused', text: '已中止' }] },
        { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', category: [{ status: 'success', text: '执行完成' }] },
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
        title: '活动状态',
        dataIndex: 'category',
        align: 'left',
        render: (category) => {
          const styleConfig = {
            'executing': {
              background: 'rgba(82, 128, 255, 1)'
            },
            'success': {
              background: 'rgba(33, 186, 69, 1)'
            },
            'fail': {
              background: 'rgba(231, 73, 73, 1)'
            },
            'paused': {
              background: 'rgba(0, 0, 0, 0.25)'
            }
          };

          return (
            <div>
              {category.map((x, index) => (
                <span key={index} style={{ display: 'flex', alignItems: 'center' }}>
                   <span style={{ display: 'block', borderRadius: '100%', width: 6, height: 6, marginRight: 8, ...styleConfig[x.status] }} />
                    {x.text}
                </span>
              ))}
            </div>
          )
        }
      },
        {
            title: '操作',
            dataIndex: 'creator',
            align: 'left',
            width: 200,
            render: () => {
              const iconStyle = {
                paddingRight: 16,
                cursor: 'pointer',
                lineHeight: '20px',
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
