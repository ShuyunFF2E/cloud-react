---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: 'JQuery',
    value: '1',
  },
  {
    label: 'Vue',
    value: '2',
  },
  {
    label: 'React',
    value: '3',
  },
  {
    label: 'Angular',
    value: '4',
  },
  {
    label: '超长超长超长超长超长超长',
    value: '5',
  },
];

export default function SelectDemo() {
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <div style={{ marginBottom: 15 }}>超长展示...，鼠标放上去，通过 title 标签的形式展示全部</div>
      <Select
        isSupportTitle
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 120 }}
        dataSource={dataList}
      />
      <Select
        multiple
        isSupportTitle
        onChange={handleChange}
        style={{ width: 120 }}
        dataSource={dataList}
      />
      <div style={{ marginBottom: 15, marginTop: 15 }}>下拉面板自适应宽度</div>
      <Select
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 120 }}
        dataSource={dataList}
        dropdownStyle={{ width: 'fit-content' }}
      />
      <Select
        multiple
        onChange={handleChange}
        style={{ width: 120 }}
        dataSource={dataList}
        dropdownStyle={{ width: 'fit-content' }}
      />
    </div>
  );
}
```
