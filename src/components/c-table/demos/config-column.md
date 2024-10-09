---
order: 4 title: CTable desc: 固定列
---

```jsx
/**
 * title: 列设置-复杂模式
 */
import React, { useState, useRef } from 'react';
import { CTable, Button, Select, Radio, Checkbox } from 'cloud-react';

const data = [
  {
    id: '121410327',
    name: '手机号优先继续发送1',
    createTime: '2021/12/14 10:19:02',
    creator: 'liyuan.meng',
    approver: 'admin',
    status: '执行完成'
  },
  {
    id: '121410328',
    name: 'ouid疲劳度3',
    createTime: '2021/12/13 15:47:33	',
    creator: 'jiaojiao.diao',
    approver: 'admin',
    status: '执行中'
  },
  {
    id: '121410329',
    name: '继续发送手机1',
    createTime: '2021/12/13 15:36:42',
    creator: 'nan.run',
    approver: 'admin',
    status: '待审批'
  },
  {
    id: '121408294',
    name: '继续发送手机2',
    createTime: '2021/12/13 11:14:40',
    creator: 'xiaotong.fan',
    approver: 'admin',
    status: '执行完成'
  },
  {
    id: '121407191',
    name: '继续发送手机3',
    createTime: '2021/12/13 11:03:05',
    creator: 'zhenxiao.guo',
    approver: 'admin',
    status: '执行错误'
  },
  {
    id: '121407192',
    name: '继续发送手机4',
    createTime: '2021/12/13 11:03:07',
    creator: 'han.wu',
    approver: 'admin',
    status: '终止'
  },
  {
    id: '121407193',
    name: '继续发送手机5',
    createTime: '2021/12/13 11:03:34',
    creator: 'yue.ren',
    approver: 'admin',
    status: '执行完成'
  },
  {
    id: '121407194',
    name: '继续发送手机6',
    createTime: '2021/12/13 11:03:05',
    creator: 'wanjuan.dong',
    approver: 'admin',
    status: '设计中'
  },
  {
    id: '121407195',
    name: '继续发送手机7',
    createTime: '2021/12/13 11:03:55',
    creator: 'ying.yan',
    approver: 'admin',
    status: '执行完成'
  },
  {
    id: '121407196',
    name: '继续发送手机8',
    createTime: '2021/12/13 11:03:23',
    creator: 'xian.yong',
    approver: 'admin',
    status: '执行完成'
  },
];

const columns = [
  { title: '活动ID', dataIndex: 'id', width: 150 },
  { title: '活动名称', dataIndex: 'name', width: 200 },
  { title: '创建人', dataIndex: 'creator', align: 'left', width: 140 },
  {
    title: '创建时间', dataIndex: 'createTime', width: 200, render: val => {
      return <CTable.TimeTpl value={val} />
    }
  },
  { title: '审批人', dataIndex: 'approver', align: 'left', width: 150 },
  { title: '活动状态', dataIndex: 'status', align: 'left', width: 150 },
  {
    title: '操作',
    dataIndex: 'operator',
    render: (v, row) => (
      <div>
        <Button disabled={row.id === '121410327'} type="link" size="small"
                style={{ padding: '0px 11px 0 0' }}>编辑</Button>
        <Button type="link" size="small" style={{ padding: '0 11px' }}>查看报告</Button>
        <Button disabled={row.id === '121410327'} type="link" size="small" colorType="danger"
                style={{ padding: '0 11px' }}>删除</Button>
      </div>
    ),
    width: 300,
  }
];

export default function CTableDemo() {
  const tableRef = useRef();
  const [size, setSize] = useState('default');
  const [valid, setValid] = useState(false);
  const [isReloadGrid, setIsReloadGrid] = useState(true);
  const [supportResizeColumn, setSupportResizeColumn] = useState(false);

  return (
    <div>
      <CTable
        style={{ height: 500, marginTop: 20 }}
        ref={tableRef}
        supportPage
        columnData={columns}
        supportConfigColumn
        defaultShowColumns={columns.slice(0, 4).map(item => item.dataIndex)}
        hideConfigColumns={['operator']}
        disabledConfigColumns={['id']}
        configColumnType="complex"
        onColumnChange={({ columnData }) => {
          console.log(columnData);
        }}
        ajaxData={(params) => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                totals: data.length,
                data: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum)))
              })
            }, 500);
          });
        }}
      />
    </div>
  );
}
```
