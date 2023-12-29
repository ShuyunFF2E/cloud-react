```jsx

/**
 * title: 商品选择器表格
 * desc: 商品选择器表格交互样例
 */
import React, { useState, createRef, useEffect, Component } from 'react';
import { CTable, Button, Checkbox } from 'cloud-react';
// import './style/goods.less';

function createGuid() {
  let guid = '';
  for (let i = 1; i <= 2; i += 1) {
    guid += Math.random()
      .toString(32)
      .substr(2);
  }
  return guid.replace(/^\d+/, '');
}

const getData = (count1, count2) => {
  return new Array(count1).fill(1).map((item, index) => (
    {
      productId: 121410327 + index,
      productName: '数云牌铂金戒指' + index,
      details: '详情详情详情详情' + index,
      level: 0,
      skus: index === 0 ? [] : new Array(count2).fill(1).map((item, index1) => {
        return {
          productId: createGuid(),
          productName: '商品颜色分类：DarkSeaGreen' + index * index1,
          details: '详情',
          level: 1,
        }
      })
    }
  ))
}

function CTableDemo() {
  const tableRef = createRef();
  const [isExpandAll, setIsExpandAll] = useState(true);
  const [currentData, setCurrentData] = useState([]);
  const [checkedGoodsData, setCheckedGoodsData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(getData(300, 700));
  }, [])
  
  useEffect(() => {
    if (data.length) {
      tableRef.current.refreshTable();
    }
  }, [data.length]);
  
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      align: 'left',
      fixed: true,
      width: 290,
    },
    {
      title: '商品ID',
      dataIndex: 'productId',
      align: 'left',
      width: 200,
    },
    {
      title: '详情',
      dataIndex: 'details',
      align: 'left',
      width: 200,
    }
  ];

  /**
   * 展开行
   * @param expanded
   * @param row
   */
  const onExpand = (expanded, row) => {
    if (expanded) {
      setExpandedRowKeys(Array.from(new Set([...expandedRowKeys, row.productId])))
    } else {
      const index = expandedRowKeys.findIndex(productId => productId === row.productId);
      if (index > -1) {
        expandedRowKeys.splice(index, 1);
        setExpandedRowKeys([...expandedRowKeys]);
      }
    }
  }

  /**
   * 展开全部
   */
  const onExpandAll = () => {
    setIsExpandAll(!isExpandAll);
    if (isExpandAll) {
      setExpandedRowKeys([...data.map(item => item.productId)]);
    } else {
      setExpandedRowKeys([]);
    }
  }

  return (
    <div className="cloud-table-goods">
      <Button style={{ marginBottom: 20 }} onClick={onExpandAll}>{isExpandAll ? '展开全部' : '收起全部'}</Button>
      <CTable
        ref={tableRef}
        virtual
        scroll={{ x: '100%', y: 400 }}
        showTotal
        supportExpend
        supportTree
        supportPage
        isExpendAloneColumn
        rowKey="productId"
        childrenKey="skus"
        isTreeIncludeChildren={false}
        /**
           * 更多 expandable 功能查看 API：https://table-react-component.vercel.app/#api
          */
        expandable={{
          expandedRowKeys,
          onExpand
        }}
        checkedData={checkedGoodsData.map(item => ({ productId: item.productId }))}
        columnData={columns}
        onCheckedAfter={checkedList => {
          setCheckedGoodsData([...checkedList]);
          console.log('已选商品列表:', checkedList);
        }}
        onCheckedAllAfter={checkedList => {
          setCheckedGoodsData([...checkedList]);
          console.log('已选商品列表:', checkedList);
        }}
        ajaxData={(params) => {
          return new Promise(resolve => {
            const res = JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum)));
            resolve({ totals: data.length, data: res });
          })
        }}
      />
    </div>
  )
}

export default CTableDemo;
```
