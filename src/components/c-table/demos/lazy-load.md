---
order: 1 title: CTable desc: 默认表格
---

```jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CTable, Button, Loading } from 'cloud-react';
import { VList } from "virtuallist-antd";

const getData = (count) => {
  return new Array(count).fill(1).map((item, index) => (
    { id: 121410327 + index, name: `手机号优先继续发送${index}`, createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', num: 12222 }
  ))
}

const columns = [
  { title: '活动ID', dataIndex: 'id', width: 130 },
  {
    title: '活动名称', dataIndex: 'name', width: 140, render: val => {
      return <CTable.TextTpl value={val} />
    }
  },
  {
    title: '创建时间', dataIndex: 'createTime', width: 140, render: val => {
      return <CTable.TimeTpl value={val} />
    }
  },
  {
    title: '人数',
    dataIndex: 'num',
    align: 'right',
    width: 120,
    render: val => <CTable.NumberTpl value={val} precision={0} />
  },
  { title: '创建人', dataIndex: 'creator', width: 130 }
];

export default function CTableDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [checkedData, setCheckedData] = useState([]);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setTimeout(() => {
      setData(getData(10));
      setIsLoading(false);
    }, 2000);
  }, [])

  const handleReachEnd = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("获取新数据", data);
      setData((pre) => {
        const temp = getData(10);
        return [...pre, ...temp];
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const vc = useMemo(() => {
    return VList({
      height: 400,
      onReachEnd: handleReachEnd
    });
  }, [handleReachEnd]);
  console.log(vc);

  return (
    <div>
      <CTable
        sticky={{
          offsetHeader: 64,
        }}
        style={{ width: '100%', height: 464 }}
        rowKey="id"
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
        supportRadio
        checkedData={checkedData}
        onCheckedAfter={checkedData => {
          setCheckedData(checkedData);
        }}
        components={vc}
        useOuterLoading
        loadingTpl={() => {
          return (
            <Loading
              style={{ position: 'absolute', top: 0 }}
              loading={isLoading}
              layer
            />
          )
        }}
      />
    </div>
  );
}
```
