---
order: 6 title: CTable desc: 展开行
---

```jsx
import React from 'react';
import { CTable } from 'cloud-react';
import headerImg from './header.jpg';

const data = [
  { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', key: '121410327' },
  {
    id: '121410328',
    name: 'ouid疲劳度3',
    createTime: '2021/12/13 15:47:33	',
    creator: 'jiaojiao.diao',
    key: '121410328'
  },
  { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', key: '121410329' },
  { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', key: '121408294' },
  { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', key: '121407191' },
];

const columns = [
  {
    title: '活动名称', dataIndex: 'name', align: 'left', render: (value) => (
      <div style={{ display: 'flex' }}>
        <img style={{ width: 24, height: 24, borderRadius: '100%', marginRight: 8 }} src={headerImg} />
        <span>{value}</span>
      </div>
    )
  },
  { title: '活动ID', dataIndex: 'id', align: 'left' },
  { title: '创建时间', dataIndex: 'createTime', align: 'left', render: val => <CTable.TimeTpl value={val} /> },
  { title: '创建人', dataIndex: 'creator', align: 'left' }
];

export default function CTableDemo() {
  return (
    <CTable
      supportExpend
      expandedRowRender={row => {
        const liStyle = {
          marginBottom: 12
        }
        const labelStyle = {
          display: 'inline-block',
          width: 100,
          color: 'rgba(0, 0, 0, 0.45)'
        };
        return (
          <ul>
            <li style={liStyle}><span style={labelStyle}>活动ID</span>{row.id}</li>
            <li style={liStyle}><span style={labelStyle}>活动名称</span>{row.name}</li>
            <li style={liStyle}><span style={labelStyle}>创建时间</span>{row.createTime}</li>
            <li style={liStyle}>
              <span style={labelStyle}>活动分类</span>
              <span style={{
                width: 72,
                padding: '4px 8px',
                background: '#FFF5E6',
                color: '#D66A04',
                borderRadius: 2
              }}>大促预热</span>
            </li>
            <li><span style={labelStyle}>创建人</span>{row.creator}</li>
          </ul>
        )
      }}
      /**
       * 更多 expandable 功能查看 API：https://table-react-component.vercel.app/#api
      */
      expandable={{
        expandRowByClick: true,
        defaultExpandedRowKeys: ['121410327'],
      }}
      supportPage
      pageOpts={{ showQuickJumper: false, showPageSizeOptions: false }}
      columnData={columns}
      ajaxData={(params) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              totals: data.length,
              data: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum)))
            });
          }, 500)
        })
      }}
    />
  );
}
```
