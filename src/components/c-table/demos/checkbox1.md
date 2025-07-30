---
order: 9 title: CTable desc: 分页
---

```jsx
/**
 * title: 表格多选带分页（默认选中第2页）
 * desc: 表格多选带分页（受控分页，可由外部指定 pageNum 和 pageSize，多用于表格记忆功能）
 */
import React, { useState } from "react";
import { CTable, Checkbox, Tooltip, Icon, Button } from "cloud-react";

const data = new Array(50)
  .fill(1)
  .map((item, index) => ({
    id: 121410327 + index,
    name: "手机号优先继续发送1",
    createTime: "2021/12/14 10:19:02",
    creator: "liyuan.meng",
  }));

const columns = [
  {
    title: (item) => {
      return (
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 5 }}>活动ID</span>
          <Tooltip content="说明说明">
            <Icon
              style={{ color: "rgba(0, 0, 0, 0.25)" }}
              type="question-circle"
            />
          </Tooltip>
        </span>
      );
    },
    dataIndex: "id",
    align: "left",
  },
  {
    title: "活动名称",
    dataIndex: "name",
    render: (val) => {
      return <CTable.TextTpl value={val} />;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  { title: "创建人", dataIndex: "creator", align: "left" },
];

export default function CTableDemo() {
  const [checkedData, setCheckedData] = useState([]);
  const [pageOpts, setPageOpts] = useState({ pageNum: 2, pageSize: 20 });
  return (
    <div>
      <CTable
        style={{ width: "100%", height: 400 }}
        supportExpend
        supportTree
        supportCheckbox
        supportPage
        rowKey="id"
        dataKey="list"
        totalsKey="total"
        isDelay
        showRefresh
        showTotal
        checkedData={checkedData}
        columnData={columns}
        pageOpts={{
          current: pageOpts.pageNum,
          pageSize: pageOpts.pageSize,
          onChange: (opts) => {
            setPageOpts(opts);
          },
        }}
        ajaxData={(params) => {
          return {
            total: data.length,
            list: JSON.parse(
              JSON.stringify(
                data.slice(
                  params.pageSize * (params.pageNum - 1),
                  params.pageSize * params.pageNum
                )
              )
            ),
          };
        }}
        onCheckedAfter={(checkedData) => {
          setCheckedData(checkedData);
        }}
      />
    </div>
  );
}
```
