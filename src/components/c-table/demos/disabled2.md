---
order: 9 title: CTable desc: 表格禁用行
---

```jsx

/**
 * title: 表格禁用行
 * desc: 表格禁用行（使用 onRow）
 */
import React from 'react';
import { CTable } from 'cloud-react';
import headerImg from './header.jpg';

const data = [
  { id: '121410327', name: '继续发送手机3继续发送手机3继续发送手机3继续发送手机3', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
  { id: '121410328', name: 'ouid疲劳度3ouid疲劳度3ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
  { id: '121410329', name: '继续发送手机1继续发送手机1继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
  { id: '121408294', name: '继续发送手机2继续发送手机2继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
  { id: '121407191', name: '继续发送手机3继续发送手机3继续发送手机3继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
  { id: '121407192', name: '继续发送手机4继续发送手机4继续发送手机4继续发送手机4', createTime: '2021/12/13 11:03:07', creator: 'han.wu' },
  { id: '121407193', name: '继续发送手机5继续发送手机5继续发送手机5继续发送手机5', createTime: '2021/12/13 11:03:34', creator: 'yue.ren' },
  { id: '121407194', name: '继续发送手机6继续发送手机6继续发送手机6继续发送手机6', createTime: '2021/12/13 11:03:05', creator: 'wanjuan.dong' },
  { id: '121407195', name: '继续发送手机7继续发送手机7继续发送手机7', createTime: '2021/12/13 11:03:55', creator: 'ying.yan' },
  { id: '121407196', name: '继续发送手机8继续发送手机8继续发送手机8', createTime: '2021/12/13 11:03:23', creator: 'xian.yong' },
];

const columns = [
  {
    title: '活动名称', dataIndex: 'name', align: 'left', width: 270, render: (value, row) => (
      <div style={{ display: 'flex', cursor: disabledIds.includes(row.id) ? 'not-allowed' : 'pointer' }}>
        <img style={{ width: 40, height: 40, marginRight: 8, opacity: disabledIds.includes(row.id) ? 0.5 : 1 }}
             src={headerImg} />
            <a style={{ color: disabledIds.includes(row.id) ? 'rgba(0, 0, 0, 0.25)': '#5280FF' }}>{value}</a>
      </div>
    )
  },
  { title: '活动ID', dataIndex: 'id', align: 'left' },
  { title: '创建时间', dataIndex: 'createTime', align: 'left' },
  { title: '创建人', dataIndex: 'creator', align: 'left' }
];

export default function CTableDemo() {
  return (
    <CTable
      style={{ width: '100%', height: 360 }}
      supportCheckbox
      supportPage
      useCustomScroll={false}
      rowKey="id"
      checkedData={[data[1]]}
      pageOpts={{ pageSize: 6 }}
      columnData={columns}
      onRow={row => {
        if (row.id === '121410327' || row.id === '121407191') {
          Object.assign(row, { disabled: true });
        }
      }}
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