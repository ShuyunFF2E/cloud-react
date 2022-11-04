---
order: 5
title: CTable
desc: 表格过滤
---

```jsx
import React, { useState } from 'react';
import { CTable, Icon, Tooltip, Checkbox } from 'cloud-react';
import './style/index.less';

export default function CTableDemo() {
    const [creator, setCreator] = useState('');
    const [showFilterBtn, setShowFilterBtn] = useState(true);

    const data = [
        { id: '121410327', name: '手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1手机号优先继续发送1', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng', category: { status: 'executing', text: '执行中' } },
        { id: '121410328', name: 'ouid疲劳度3', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao', category: { status: 'success', text: '执行完成' } },
        { id: '121410329', name: '继续发送手机1', createTime: '2021/12/13 15:36:42', creator: 'nan.run', category: { status: 'fail', text: '执行失败' } },
        { id: '121408294', name: '继续发送手机2', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan', category: { status: 'paused', text: '已中止' } },
        { id: '121407191', name: '继续发送手机3', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo', category: { status: 'success', text: '执行完成' } },
    ];

    const columns = [
        {
            sortable: true,
            title: '活动ID',
            dataIndex: 'id',
            align: 'left',
        },
        { 
            title: '活动名称',
            dataIndex: 'name',
            align: 'left',
            ellipsis: true,
            render: (value) => {
                return (
                    <Tooltip content={value} placement="top-left">
                        {value}
                    </Tooltip>
                )
            }
        },
        { 
            title: '创建时间',
            dataIndex: 'createTime',
            align: 'left'
        },
      {
        title: '活动状态',
        dataIndex: 'category',
        align: 'left',
        sortable: true,
        filters: [
          { text: '执行完成', value: 'success' },
          { text: '执行中', value: 'executing' },
          { text: '执行失败', value: 'fail' },
          { text: '执行错误', value: 'error' },
          { text: '已中止', value: 'paused', disabled: true }
        ],
        render: (category) => {
          const styleConfig = {
            'executing': {
              background: 'rgba(82, 128, 255, 1)'
            },
            'success': {
              background: 'rgba(33, 186, 69, 1)'
            },
            'fail': {
              background: 'rgba(231, 73, 73, 1)'
            },
            'paused': {
              background: 'rgba(0, 0, 0, 0.25)'
            }
          };

          return (
            <div>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                   <span style={{ display: 'block', borderRadius: '100%', width: 6, height: 6, marginRight: 8, ...styleConfig[category.status] }} />
                    {category.text}
                </span>
            </div>
          )
        }
      },
        {
            title: '操作',
            dataIndex: 'creator',
            align: 'left',
            width: 200,
          render: () => {
            const iconStyle = {
              marginRight: 16,
              cursor: 'pointer',
              lineHeight: '20px',
            };
            return (
              <div className="custom-operate" style={{ display: 'flex', color: 'rgba(0, 0, 0, 0.45)' }}>
                <Tooltip content="导出文件">
                  <Icon style={iconStyle} type="export" />
                </Tooltip>
                <Tooltip content="设置条目">
                  <Icon style={iconStyle} type="config" />
                </Tooltip>
                <Tooltip content="复制条目">
                  <Icon style={iconStyle} type="copy" />
                </Tooltip>
                <Tooltip content="删除条目">
                  <Icon style={iconStyle} type="delete" />
                </Tooltip>
              </div>
            )
          },

        }
    ];

  const sort = (data, { sortParams }) => {
    if (sortParams?.dataIndex === 'id') {
      return data.sort((a, b) => sortParams.sortBy === 'ASC' ? a.id - b.id : b.id - a.id);
    }
    return data;
  };

  const filter = (data, { filterValue }) => {
    return data.filter(item => !filterValue.length || (filterValue.length && filterValue.includes(item.category.status)))
  };

	return (
        <div className="cloud-table-demo">
          <Checkbox style={{ marginBottom: 20 }} checked={showFilterBtn} onChange={checked => {
            setShowFilterBtn(checked)
          }}>
            筛选项展示确定按钮
          </Checkbox>
          <CTable
            key={Math.random()}
            style={{ width: '100%', height: 360 }}
            showFilterBtn={showFilterBtn}
            // useCustomScroll={false}
            columnData={columns}
            ajaxData={(params) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  const filterData = filter(sort(data, params), params);
                  resolve({ totals: filterData.length, data: JSON.parse(JSON.stringify(filterData.slice(params.pageSize * (params.pageNum - 1), params.pageSize * params.pageNum))) });
                }, 200)
              })
            }}
          />
        </div>
	);
}
```
