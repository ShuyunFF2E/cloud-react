---
order: 9
title: CTable
desc: 分页
---

```jsx

/**
 * title: 表格多选带分页
 * desc: 表格多选带分页
 */

import React, { useState } from 'react';
import { CTable, Checkbox, Tooltip, Icon, Button } from 'cloud-react';

const data = new Array(50).fill(1).map((item, index) => (
  { id: 121410327 + index, name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' }
))

const columns = [
  {
    title: item => {
      return <span style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 5 }}>活动ID</span>
                <Tooltip content="说明说明"><Icon style={{ color: 'rgba(0, 0, 0, 0.25)' }} type="question-circle"/></Tooltip>
            </span>;
    },
    dataIndex: 'id',
    align: 'left'
  },
    { title: '活动名称', dataIndex: 'name', align: 'left' },
    { title: '创建时间', dataIndex: 'createTime', align: 'left' },
    { title: '创建人', dataIndex: 'creator', align: 'left' }
];

export default function CTableDemo() {
  const [showRefresh, setShowRefresh] = useState(true);
  const [showTotal, setShowTotal] = useState(true);
  const [showFooterSelect, setShowFooterSelect] = useState(true);
  const [checkedData, setCheckedData] = useState([data[1], data[4], data[15]]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox style={{ marginLeft: 15 }} checked={showRefresh} onChange={checked => {
          setShowRefresh(checked);
        }}>显示刷新按钮</Checkbox>
        <Checkbox style={{ marginLeft: 15 }} checked={showTotal} onChange={checked => {
          setShowTotal(checked);
        }}>显示总条数</Checkbox>
        <Checkbox style={{ marginLeft: 15 }} checked={showFooterSelect} onChange={checked => {
          setShowFooterSelect(checked);
        }}>显示已选条数</Checkbox>
        <Button style={{ marginLeft: 15 }} onClick={() => {
          setCheckedData([]);
        }}>清空已选</Button>
        <Button style={{ marginLeft: 15 }} onClick={() => {
          setCheckedData([data[0], data[1]]);
        }}>选中前两条</Button>
        <Checkbox style={{ marginLeft: 15 }} checked={isLoading} onChange={checked => {
          setIsLoading(checked);
        }}>展示loading</Checkbox>
      </div>
      <CTable
        style={{ width: '100%', height: 400 }}
        supportExpend
        supportTree
        supportCheckbox
        supportPage
        rowKey="id"
        dataKey="list"
        totalsKey="total"
        isDelay
        showFooterSelect={showFooterSelect}
        showRefresh={showRefresh}
        showTotal={showTotal}
        checkedData={checkedData}
        columnData={columns}
        ajaxData={(params) => {
            return { total: data.length, list: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) };
        }}
        onCheckedAfter={checkedData => {
            setCheckedData(checkedData);
        }}
        loadingOpts={{
          loading: isLoading,
          layer: true,
        }}
      />
    </div>
  );
}
```
