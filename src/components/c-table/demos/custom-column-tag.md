---
order: 5
title: CTable
desc: 自定义列模板
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', category: [{ status: 'primary-tag', text: '标签文字' }, { status: 'default-tag', text: '标签文字' }] },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', category: [{ status: 'primary-tag', text: '标签文字' }, { status: 'error-tag', text: '标签文字' }] },
    { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', category: [{ status: 'warn-tag', text: '标签文字' }, { status: 'primary-tag', text: '标签文字' }] },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', category: [{ status: 'success-tag', text: '标签文字' }] },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', category: [{ status: 'default-tag', text: '标签文字' }, { status: 'warn-tag', text: '标签文字' }] },
];

const columns = [
    { title: '活动ID', dataIndex: 'id' },
    { title: '活动名称', dataIndex: 'name' },
    { title: '创建时间', dataIndex: 'createTime' },
    {
        title: '活动分类',
        dataIndex: 'category',
        render: (category) => {
          const styleConfig = {
            'primary-tag': {
              background: 'rgba(245, 248, 255, 1)',
              color: 'rgba(51, 82, 204, 1)'
            },
            'warn-tag': {
              background: 'rgba(255, 249, 219, 1)',
              color: 'rgba(217, 152, 0, 1)'
            },
            'error-tag': {
              background: 'rgba(255, 237, 237, 1)',
              color: 'rgba(189, 53, 53, 1)'
            },
            'default-tag': {
              background: 'rgba(245, 245, 245, 1)',
              color: 'rgba(0, 0, 0, 0.65)'
            },
            'success-tag': {
              background: 'rgba(229, 249, 231, 1)',
              color: 'rgba(0, 143, 57, 1)'
            }
          };

            return (
                <div>
                    {category.map((x, index) => (
                        <span key={index} style={{ padding: '4px 8px', marginRight: 12, ...styleConfig[x.status] }}>
                            {x.text}
                        </span>
                    ))}
                </div>
            )
        }
    },
    { title: '创建人', dataIndex: 'creator' },
];

export default function CTableDemo() {
	return (
        <CTable
            columnData={columns}
            ajaxData={{ totals: data.length, data }}
        />
	);
}
```
