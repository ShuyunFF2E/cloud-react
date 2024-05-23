---
order: 1
title: CTable
desc: 默认表格
---

```jsx

/**
 * title: 文本类型
 * desc: 单行文本、单行链接、多行文本、多行链接：超长则展示省略号和 tooltip 提示，不超长则不展示省略号和 tooltip 提示
 */
import React from 'react';
import { CTable } from 'cloud-react';

const data = [
  { id: '121410327', name: '文本文本1', url: 'https://www.taobao.com', createTime: '2021/12/14 10:19:02', creator: 'liyuan.meng' },
  { id: '121410328', name: '文本文本2', url: 'https://www.taobao.com', createTime: '2021/12/13 15:47:33	', creator: 'jiaojiao.diao' },
  { id: '121410329', name: '文本文本超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长', url: 'https://www.taobao.com', createTime: '2021/12/13 15:36:42', creator: 'nan.run' },
  { id: '121408294', name: '文本文本超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长', url: 'https://www.taobao.com', createTime: '2021/12/13 11:14:40', creator: 'xiaotong.fan' },
  { id: '121407191', name: '文本文本文本文本文本3', url: 'https://www.taobao.com', createTime: '2021/12/13 11:03:05', creator: 'zhenxiao.guo' },
  { id: '121407192', name: '文本文本4', url: '', createTime: '2021/12/13 11:03:07', creator: 'han.wu' },
  { id: '121407199', name: 'koookoooko-20240520000-20240520000', url: '', createTime: '2021/12/13 11:03:07', creator: 'han.wu' },
  { id: '', name: '', url: '', createTime: '', creator: '' },
];

const columns = [
  {
    title: '单行文本',
    dataIndex: 'name',
    width: 100,
    type: 'TEXT'
  },
  {
    title: '单行链接',
    dataIndex: 'name',
    width: 120,
    type: 'LINK',
    typeConfig: {
      linkKey: 'url'
    }
  },
  {
    title: '多行文本',
    dataIndex: 'name',
    width: 100,
    type: 'MULTI_TEXT'
  },
  {
    title: '多行链接',
    dataIndex: 'name',
    width: 200,
    type: 'MULTI_LINK',
    typeConfig: {
      linkKey: 'url'
    }
  },
];

export default function CTableDemo() {
	return (
        <CTable
           columnData={columns}
           ajaxData={{ totals: data.length, data }}
        />
	);
}
```
