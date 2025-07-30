---
order: 7 title: CTable desc: 单选
---

```jsx
/**
 * title: 在 Tabs 中使用表格
 * desc: 在 Tabs 中使用单选表格，切换 Tabs 时，需要更新表格列和数据源，并清空已选项
 */
import React, { useState, useEffect, useRef } from "react";
import { CTable, Checkbox, Button, Tabs } from "cloud-react";

const tableConfig = {
  tab1: {
    columnData: [
      { title: "活动ID", dataIndex: "id" },
      { title: "活动名称", dataIndex: "name" },
      {
        title: "创建时间",
        dataIndex: "createTime",
        render: (val) => {
          return <CTable.TimeTpl value={val} />;
        },
      },
      { title: "创建人", dataIndex: "creator" },
    ],
    ajaxData: (params) => {
      const data = new Array(10)
        .fill(1)
        .map((item, index) => ({
          id: 121410327 + index,
          name: "手机号优先继续发送1",
          createTime: "2021/12/14 10:19:02",
          creator: "liyuan.meng",
        }));
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totals: data.length,
            data: JSON.parse(
              JSON.stringify(
                data.slice(
                  params.pageSize * (params.pageNum - 1),
                  params.pageSize * params.pageNum
                )
              )
            ),
          });
        }, 200);
      });
    },
  },
  tab2: {
    columnData: [
      { title: "活动ID1", dataIndex: "id1" },
      { title: "活动名称1", dataIndex: "name1" },
      { title: "创建时间1", dataIndex: "createTime1" },
      { title: "创建人1", dataIndex: "creator1" },
    ],
    ajaxData: (params) => {
      const data = new Array(20)
        .fill(1)
        .map((item, index) => ({
          id1: 32323455 + index,
          name1: "啦啦啦啦啦啦",
          createTime1: "2023/09/09 11:22:33",
          creator1: "mly",
        }));
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totals: data.length,
            data: JSON.parse(
              JSON.stringify(
                data.slice(
                  params.pageSize * (params.pageNum - 1),
                  params.pageSize * params.pageNum
                )
              )
            ),
          });
        }, 200);
      });
    },
  },
};

export default function CTableDemo() {
  const tableRef = useRef();
  const [activeTab, setActiveTab] = useState("tab1");
  const [checkedData, setCheckedData] = useState([]);

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={(value) => {
          setActiveTab(value);
          setCheckedData([]);
        }}
      >
        <Tabs.Panel tab="tab1" key="tab1" />
        <Tabs.Panel tab="tab2" key="tab2" />
      </Tabs>
      <CTable
        key={activeTab}
        ref={tableRef}
        style={{ width: "100%", height: 400 }}
        supportRadio
        supportPage
        checkedData={checkedData}
        columnData={tableConfig[activeTab].columnData}
        ajaxData={tableConfig[activeTab].ajaxData}
        onCheckedAfter={(checkedList) => {
          setCheckedData(checkedList);
        }}
      />
    </div>
  );
}
```
