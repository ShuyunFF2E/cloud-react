---
order: 1 title: CTable desc: 自定义表格行背景色
---

```jsx
import React, { useRef, useEffect, useState } from 'react';
import { CTable } from 'cloud-react';

const data = [
  { id: '121410327', name: '手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
  { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
  { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
  { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
  { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
];

const columns = [
  { title: '活动ID', dataIndex: 'id' },
  { title: '活动名称', dataIndex: 'name' },
  {
    title: '创建时间', dataIndex: 'createTime', render: val => {
      return <CTable.TimeTpl value={val} />
    }
  },
  { title: '创建人', dataIndex: 'creator' }
];

export default function CTableDemo() {
  const ref = useRef();
  const [activeKey, setActiveKey] = useState(null);

  const onClickRow = evt => {
    if (evt.target?.parentNode?.dataset?.rowKey) {
      setActiveKey(evt.target?.parentNode?.dataset?.rowKey);
    }
  }

  useEffect(() => {
    ref.current.addEventListener('click', onClickRow);

    return () => {
      ref.current.removeEventListener('click', onClickRow);
    }
  }, [])

  return (
    <div id="demo" ref={ref} className="cloud-table-demo">
      <CTable
        rowClassName={(row) => {
          if (row.id === activeKey) {
            // 可以自定义类，在业务中自定义色值
            return "cloud-table-row-lighted";
          }
          return row.id;
        }}
        columnData={columns}
        ajaxData={{ totals: data.length, data }}
      />
    </div>
  );
}
```
