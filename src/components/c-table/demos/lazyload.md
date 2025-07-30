---
order: 1 title: CTable desc: 默认表格 https://www.npmjs.com/package/react-infinite-scroll-component
---

```jsx
/**
 * title: 懒加载
 * desc: 使用三方库 react-infinite-scroll-component：https://www.npmjs.com/package/react-infinite-scroll-component
 */
import React, { useState, useRef } from "react";
import { CTable } from "cloud-react";
import InfiniteScroll from "react-infinite-scroll-component";

const getData = (count) => {
  return new Array(count)
    .fill(1)
    .map((item, index) => ({
      id: 121410327 + index,
      name: `手机号优先继续发送${index}`,
      createTime: "2021/12/14 10:19:02",
      creator: "liyuan.meng",
      num: 12222,
    }));
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
  const ref = useRef();
  const [_listData, setData] = React.useState(getData(10));
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("获取新数据", _listData);
      setData((pre) => {
        const temp = getData(10);
        return [...pre, ...temp];
      });
      setIsLoading(false);
    }, 200);
  };

  return (
    <div ref={ref}>
      <CTable
        style={{ height: 400 }}
        columnData={columns}
        ajaxData={{ totals: _listData.length, data: _listData }}
        loadingOpts={{
          loading: isLoading,
          layer: true,
        }}
        rcTableConfig={{
          components: {
            table: (props) => (
              <InfiniteScroll
                dataLength={_listData.length}
                next={handlePageChange}
                hasMore
                scrollableTarget={ref?.current?.querySelector(
                  ".cloud-table-body"
                )}
              >
                <table style={props.style}>{props.children}</table>
              </InfiniteScroll>
            ),
          },
        }}
      />
    </div>
  );
}
```
