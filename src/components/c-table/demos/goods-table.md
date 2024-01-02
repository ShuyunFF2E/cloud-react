```jsx

/**
 * title: 商品选择器表格
 * desc: 商品选择器表格交互样例
 */
import React, { useState, createRef, useEffect, Component } from 'react';
import { CTable, Button, Checkbox } from 'cloud-react';
import './style/goods.less';

function createGuid() {
  let guid = '';
  for (let i = 1; i <= 2; i += 1) {
    guid += Math.random()
      .toString(32)
      .substr(2);
  }
  return guid.replace(/^\d+/, '');
}

const data = new Array(30).fill(1).map((item, index) => (
  {
    productId: 121410327 + index,
    productName: '数云牌铂金戒指' + index,
    details: '详情详情详情详情' + index,
    level: 0,
    skus: index === 0 ? [] : new Array(3).fill(1).map((item, index1) => {
      return {
        productId: createGuid(),
        productName: '商品颜色分类：DarkSeaGreen' + index * index1,
        details: '详情',
        level: 1,
      }
    })
  }
))

class CTableDemo extends Component {
  tableRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      isExpandAll: true,
      currentData: [],
      checkedGoodsData: [],
      checkedSkusData: [],
      expandedRowKeys: [],
    };
    this.updateBtnText();
  }

  updateBtnText = () => {
    const eles = document.querySelectorAll('tr.cloud-table-row-level-0');
    eles.forEach((ele, index) => {
      if (ele.classList.contains('custom-row-disabled')) {
        const btnEle = ele.querySelector('.choose-sku-btn');
        if (btnEle) {
          btnEle.textContent = '取消选择sku';
        }

        // 更新已选商品列表
        const targetProductId = ele.dataset.rowKey;
        if (targetProductId) {
          const { checkedGoodsData } = this.state;
          const i = checkedGoodsData.findIndex(goods => String(goods.productId) === String(targetProductId));
          if (i > -1) {
            checkedGoodsData.splice(i, 1);
            this.setState({
              checkedGoodsData: [...checkedGoodsData]
            })
          }
        }

      } else {
        const btnEle = ele.querySelector('.choose-sku-btn');
        if (btnEle) {
          btnEle.textContent = '选择sku';
        }

        // 更新已选SKU列表
        if (this.state.currentData[index]) {
          const { checkedSkusData } = this.state;
          const curSkusIds = this.state.currentData[index].skus.map(sku => sku.productId);
          curSkusIds.forEach(id => {
            const i = checkedSkusData.findIndex(sku => String(sku.productId) === String(id));
            if (i > -1) {
              checkedSkusData.splice(i, 1);
              this.setState({
                checkedSkusData: [...checkedSkusData]
              })
            }
          });
        }
      }
    })
  };

  columns = [
    {
      title: '商品名称',
      dataIndex: 'productName',
      align: 'left',
      fixed: true,
      width: 290,
      render: (_, row) => {
        if (row.level === 0) {
          return row.productName;
        }
        const { checkedSkusData } = this.state;
        return (
          <div>
            <Checkbox defaultChecked={!!checkedSkusData.find(sku => String(sku.productId) === String(row.productId))} onChange={checked => {
              if (checked) {
                if (!checkedSkusData.find(sku => String(sku.productId) === String(row.productId))) {
                  checkedSkusData.push(row);
                  this.setState({
                    checkedSkusData: [...checkedSkusData]
                  })
                  console.log('已选sku列表:', checkedSkusData);
                }
              } else {
                const index = checkedSkusData.findIndex(sku => String(sku.productId) === String(row.productId));
                if (index > -1) {
                  checkedSkusData.splice(index, 1);
                  this.setState({
                    checkedSkusData: [...checkedSkusData]
                  })
                  console.log('已选sku列表:', checkedSkusData);
                }
              }
            }} />
            <span style={{ marginLeft: 22 }}>{row.productName}</span>
          </div>
        )
      }
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
    },
    {
      title: '商品商家编码',
      dataIndex: 'outerId',
      align: 'left',
      width: 200,
      render: () => '商品商家编码',
      show: false,
    },
    {
      title: '商家时间',
      dataIndex: 'time',
      align: 'left',
      width: 200,
      render: () => '商家时间',
    },
    {
      title: '上架平台',
      dataIndex: 'plat',
      align: 'left',
      width: 200,
      render: () => '上架平台',
    },
    {
      title: '上架店铺',
      dataIndex: 'shop',
      align: 'left',
      width: 200,
      render: () => '上架店铺',
    },
    {
      title: '标准类目',
      dataIndex: 'category',
      align: 'left',
      width: 200,
      render: () => '标准类目',
    },
    {
      title: '自定义类目',
      dataIndex: 'customCategory',
      align: 'left',
      width: 200,
      render: () => '自定义类目',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'left',
      width: 140,
      fixed: 'right',
      render: (_, row) => {
        return row.skus && row.skus.length ? (
          <Button
            className="choose-sku-btn"
            style={{ padding: 0, lineHeight: '16px' }}
            type="link"
            onClick={() => {
              this.onExpand(!row.isExpand, row)
            }}>
            {row.isExpand ? '取消选择sku' : '选择sku'}
          </Button>
        ) : null
      }
    },
  ];

  /**
   * 展开行
   * @param expanded
   * @param row
   */
  onExpand = (expanded, row) => {
    if (expanded) {
      this.setState({
        expandedRowKeys: Array.from(new Set([...this.state.expandedRowKeys, row.productId])),
      }, () => {
        this.updateBtnText();
      })
    } else {
      const { expandedRowKeys } = this.state;
      const index = expandedRowKeys.findIndex(productId => productId === row.productId);
      if (index > -1) {
        expandedRowKeys.splice(index, 1);
        this.setState({
          expandedRowKeys: [...expandedRowKeys],
        }, () => {
          this.updateBtnText();
        })
      }
    }
  }

  /**
   * 展开全部
   */
  onExpandAll = () => {
    this.setState({ isExpandAll: !this.state.isExpandAll });
    if (this.state.isExpandAll) {
      const currentIds = Array.from(new Set([...this.state.currentData.map(item => item.productId), ...this.state.expandedRowKeys]));
      this.setState({
        expandedRowKeys: [...currentIds],
      }, () => {
        this.updateBtnText();
      });
    } else {
      this.setState({
        expandedRowKeys: [],
      }, () => {
        this.updateBtnText();
      });
    }
    // 手动触发组件更新（点击展开全部，切换分页后，点击收起全部，checkbox 状态没有更新成功）
    this.tableRef.current.setColumn([...this.columns.slice(0, this.columns.length - 1), this.columns[this.columns.length - 1]]);
  }

  /**
   * 表格加载完成后执行
   * @param res
   */
  onLoadGridAfter = res => {
    this.setState({ currentData: res.data })
    if (!this.state.isExpandAll) {
      this.setState({ 
        expandedRowKeys: Array.from(new Set([...this.state.expandedRowKeys, ...res.data.map(item => item.productId)])),
      }, () => {
        this.updateBtnText();
      })
    } else {
      this.setState({ expandedRowKeys: [] }, () => {
        this.updateBtnText();
      })
    }
  }

  render() {
    return (
      <div className="cloud-table-goods">
        <Button style={{ marginBottom: 20 }} onClick={this.onExpandAll}>{this.state.isExpandAll ? '展开全部' : '收起全部'}</Button>
        <CTable
          supportConfigColumn
          defaultShowColumns={this.columns.slice(0, 4).map(item => item.dataIndex)}
          disabledConfigColumns={this.columns.slice(0, 2).map(item => item.dataIndex)}
          hideConfigColumns={['operate']}
          ref={this.tableRef}
          style={{ width: '100%', height: 400 }}
          supportExpend
          supportTree
          supportCheckbox
          supportPage
          isExpendAloneColumn
          rowKey="productId"
          childrenKey="skus"
          isTreeIncludeChildren={false}
          /**
             * 更多 expandable 功能查看 API：https://table-react-component.vercel.app/#api
            */
          expandable={{
            expandedRowKeys: this.state.expandedRowKeys,
            onExpand: this.onExpand
          }}
          checkedData={this.state.checkedGoodsData.map(item => ({ productId: item.productId }))}
          columnData={this.columns}
          onCheckedAfter={checkedList => {
            this.setState({
              checkedGoodsData: [...checkedList]
            })
            console.log('已选商品列表:', checkedList);
          }}
          onCheckedAllAfter={checkedList => {
            this.setState({
              checkedGoodsData: [...checkedList]
            })
            console.log('已选商品列表:', checkedList);
          }}
          onRow={row => {
            Object.assign(row, {
              disabled: !!this.state.expandedRowKeys.includes(row.productId),
              isExpand: !!this.state.expandedRowKeys.includes(row.productId),
            });
          }}
          rowClassName={(row) => {
            if (this.state.expandedRowKeys.includes(row.productId)) {
              return "custom-row-disabled";
            }
            return '';
          }}
          onLoadGridAfter={this.onLoadGridAfter}
          ajaxData={(params) => {
            return new Promise(resolve => {
              const res = JSON.parse(JSON.stringify(data.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum)));
              resolve({ totals: data.length, data: res });
            })
          }}
          onColumnChange={({ columnData }) => {
            console.log('column changed')
            console.table(columnData);
          }}
        />
      </div>
    );
  }
}
export default CTableDemo;
```
