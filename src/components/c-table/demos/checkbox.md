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

import React, { useState, useEffect, useRef } from 'react';
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
  const [lightCheckedRow, setLightCheckedRow] = useState(false);
  const [showRefresh, setShowRefresh] = useState(true);
  const [showTotal, setShowTotal] = useState(true);
  const [showFooterSelect, setShowFooterSelect] = useState(true);
  const [checkedData, setCheckedData] = useState([data[1], data[4], data[15]]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hideEmptyFooter, setHideEmptyFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const tableRef = useRef();

  useEffect(() => {
    tableRef.current.refreshTable();
  }, [isEmpty]);

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, flexWrap: 'wrap' }}>
          <Checkbox checked={lightCheckedRow} onChange={checked => {
            setLightCheckedRow(checked);
          }}>选中行高亮</Checkbox>
          <Checkbox checked={showRefresh} onChange={checked => {
            setShowRefresh(checked);
          }}>显示刷新按钮</Checkbox>
          <Checkbox checked={showTotal} onChange={checked => {
            setShowTotal(checked);
          }}>显示总条数</Checkbox>
          <Checkbox checked={showFooterSelect} onChange={checked => {
            setShowFooterSelect(checked);
          }}>显示已选条数</Checkbox>
          <Checkbox checked={isLoading} onChange={checked => {
            setIsLoading(checked);
          }}>展示loading</Checkbox>
          <Checkbox checked={disabled} onChange={disabled => {
            setDisabled(disabled);
          }}>禁用选择</Checkbox>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <Button onClick={() => {
            setCheckedData([data[0], data[1]]);
          }}>选中前两条</Button>
          <Button onClick={() => {
            setCheckedData([]);
          }}>清空已选</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <Button onClick={() => {
            setIsEmpty(!isEmpty);
          }}>{isEmpty ? '恢复数据' : '清空数据'}</Button>
          <Checkbox checked={hideEmptyFooter} onChange={checked => {
            setHideEmptyFooter(checked);
          }}>数据为空不展示分页</Checkbox>
        </div>
      </div>
      <CTable
        key={String(disabled)}
        style={{ width: '100%', height: 400 }}
        ref={tableRef}
        supportExpend
        supportTree
        supportCheckbox
        supportPage
        rowKey="id"
        dataKey="list"
        totalsKey="total"
        isDelay
        lightCheckedRow={lightCheckedRow}
        showFooterSelect={showFooterSelect}
        showRefresh={showRefresh}
        showTotal={showTotal}
        hideEmptyFooter={hideEmptyFooter}
        disabled={disabled}
        checkedData={checkedData}
        columnData={columns}
        ajaxData={(params) => {
            return isEmpty ? {
              total: 0,
              list: []
            } : {
              total: data.length,
              list: JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum)))
            };
        }}
        onCheckedAfter={checkedData => {
            setCheckedData(checkedData);
        }}
        loadingOpts={{
          loading: isLoading,
          layer: true,
        }}
        footerTotalTpl={total => {
          return (
            <span>共 {total} 条，上限 1000 条</span>
          )
        }}
      />
    </div>
  );
}
```
