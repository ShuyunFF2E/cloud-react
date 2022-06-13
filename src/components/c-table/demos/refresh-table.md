---
order: 23
title: CTable
desc: 手动刷新表格
---

```jsx

/**
 * title: 手动刷新表格
 * desc: 手动刷新表格
 */
import React, { useState, useRef } from 'react';
import { CTable, Input, Checkbox, Button } from 'cloud-react';

export default function CTableDemo() {
  const tableRef = useRef();
  const [queryParams, setQueryParams] = useState({ isMyActivity: false, id: '' })

  const data = [
    { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
    { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
    { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
    { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
    { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
    { id: '121407192', name: '继续发送手机4', createTime: '2021/12/13 11:03:07', creator: 'han.wu' },
    { id: '121407193', name: '继续发送手机5', createTime: '2021/12/13 11:03:34', creator: 'yue.ren' },
    { id: '121407194', name: '继续发送手机6', createTime: '2021/12/13 11:03:05', creator: 'wanjuan.dong' },
    { id: '121407195', name: '继续发送手机7', createTime: '2021/12/13 11:03:55', creator: 'ying.yan' },
    { id: '121407196', name: '继续发送手机8', createTime: '2021/12/13 11:03:23', creator: 'xian.yong' },
  ];

  const columns = [
    { title: '活动ID', dataIndex: 'id' },
    { title: '活动名称', dataIndex: 'name' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '人数', dataIndex: 'num', align: 'right' },
    { title: '创建人', dataIndex: 'creator' },
    {
      title: '操作',
      dataIndex: 'creator',
      render: (value, row) => (
        <Button
          type="link"
          size="small"
          colorType="danger"
          onClick={() => {
            console.log(value, row);
            tableRef.current.refreshTable(false);
          }}>
          删除
        </Button>
      )
    }
  ];

  const filter = (data, params) => {
    const { isMyActivity, id } = params;
    return data
      .filter(item => isMyActivity && item.creator === 'liyuan.meng' || !isMyActivity)
      .filter(item => id && item.id.includes(id) || !id);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Checkbox checked={queryParams.isMyActivity} onChange={checked => {
          const params = { ...queryParams, isMyActivity: checked };
          setQueryParams(params);
          tableRef.current.refreshTable();
        }}>只看我的活动</Checkbox>
        <Input style={{ marginLeft: 15 }} hasClear placeholder="请输入活动ID" value={queryParams.id} onChange={evt => {
          const params = { ...queryParams, id: evt.target.value };
          setQueryParams(params);
          tableRef.current.refreshTable();
        }} />
      </div>
      <CTable
        ref={tableRef}
        style={{ width: '100%', height: 400 }}
        columnData={columns}
        pageOpts={{ pageSize: 6 }}
        useCustomScroll={false}
        supportPage
        ajaxData={(params) => {
          return new Promise(resolve => {
            setTimeout(() => {
              const filterData = filter(data, queryParams);
              resolve({ totals: filterData.length, data: JSON.parse(JSON.stringify(filterData.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) });
            }, 500)
          })
        }}
      />
    </div>
  );
}
```
