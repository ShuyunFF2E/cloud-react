---
order: 1 title: CTable desc: 默认表格
---

```jsx
/**
 * title: 分体式表格
 * desc: 单独控制 表格、分页 和 加载 逻辑，使用起来更加灵活。<br/>可以解决表格查询参数通过异步获取，表格需要等待参数获取完再加载，否则查询错误的问题。详见DEMO：<br/>【需求】状态下拉列表是异步获取，交互要求默认展示第一条数据。<br/>【常规写法】为了保证表格只做一次查询并且查询参数是状态列表的第一条数据，如果使用原来的组合式表格，就需要等状态列表返回后再渲染表格，会导致表格区域有短暂的空白（接口慢的话空白时间会更长）；<br/>【分体写法】如果使用分体式表格，则不存在这种问题。详细可查看 DEMO 代码
 */
import React, { useState, useEffect } from "react";
import { CTable, Pagination, Select, Form } from "cloud-react";

const fetchData = ({ pageNum, pageSize }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: new Array(pageSize)
          .fill(1)
          .map((item, index) => ({
            id: 121410327 + pageNum + index,
            name: `手机号优先继续发送${pageNum + index}`,
            createTime: "2021/12/14 10:19:02",
            creator: "liyuan.meng",
            num: 12222,
            orderNum: "33,342",
            status: index % 2 === 0 ? "生效" : "失效",
          })),
        totals: 30,
      });
    }, 500);
  });
};

const fetchStatusList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { label: "生效", value: 1 },
        { label: "失效", value: 2 },
      ]);
    }, 500);
  });
};

const columns = [
  { title: "活动ID", dataIndex: "id", width: 130 },
  {
    title: "活动名称",
    dataIndex: "name",
    width: 140,
    render: (val) => {
      return <CTable.TextTpl value={val} />;
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 140,
    render: (val) => {
      return <CTable.TimeTpl value={val} />;
    },
  },
  {
    title: "人数",
    dataIndex: "num",
    align: "right",
    width: 120,
    render: (val) => <CTable.NumberTpl value={val} precision={0} />,
  },
  { title: "创建人", dataIndex: "creator", width: 130 },
];

export default function CTableDemo() {
  const [queryParams, setQueryParams] = useState({
    status: 1,
    pageNum: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [ajaxData, setAjaxData] = useState({ data: [], totals: 0 });

  useEffect(() => {
    // 获取状态下拉列表
    fetchStatusList().then((res) => {
      setStatusList(res);
      setQueryParams({
        ...queryParams,
        status: res[0].value,
      });
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (queryParams.status) {
      // 查询参数变化，则更新表格数据
      console.log("查询数据", queryParams);
      fetchData(queryParams)
        .then((res) => {
          setAjaxData({
            data: res.data,
            totals: res.totals,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [JSON.stringify(queryParams)]);

  const onPageChange = (current, pageSize) => {
    setQueryParams({
      ...queryParams,
      pageNum: current,
      pageSize,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Form.Item label="状态：">
          <Select
            value={queryParams.status}
            dataSource={statusList}
            onChange={(v) => {
              setQueryParams({ status: v });
            }}
          />
        </Form.Item>
      </div>
      <CTable
        style={{ height: 400 }}
        columnData={columns}
        ajaxData={ajaxData}
        loadingOpts={{
          loading,
          layer: true,
        }}
      />
      <div
        style={{ display: "flex", flexDirection: "row-reverse", marginTop: 20 }}
      >
        <Pagination
          type="simple"
          onChange={onPageChange}
          total={100}
          current={queryParams.pageNum}
          pageSize={queryParams.pageSize}
          disabled={loading}
        />
      </div>
    </div>
  );
}
```
