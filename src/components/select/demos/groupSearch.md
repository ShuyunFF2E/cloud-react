---
order: 2
title:  分组下拉基本使用
desc: 基本使用
---

```jsx
/**
 * title: 分组下拉基本使用 - 3
 * desc: 添加搜索功能,清空选中项目，部分可选项目不可选中
 */
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: '淘宝',
    value: '1',
    options: [
        {
            label: '淘宝(A)',
            value: '11',
            disabled: true
        },{
            label: '淘宝(B)',
            value: '12',
        },{
            label: '淘宝(C)',
            value: '13'
        },
    ],
  },
  {
    label: '京东',
    value: '2',
    options: [
        {
            label: '自营店',
            value: '21',
        },{
            label: '非自营店',
            value: '22',
        }
    ],
  }
];

export default function SelectDemo() {
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <Select
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        searchable
        supportLightText
        allowClear
      />
    </div>
  );
}
```
