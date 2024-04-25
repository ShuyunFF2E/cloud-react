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
    label: '超长超长超长超长超长超长超长124414123超长超长',
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
      <h5>超长展示...，鼠标放上去，通过 title 标签的形式展示全部</h5>
      <Select
        isSupportTitle
        defaultValue={'5'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <Select
        multiple
        defaultValue={'5'}
        isSupportTitle
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
      />
      <h5>下拉面板自适应宽度</h5>
      <Select
        defaultValue={'5'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        dropdownStyle={{ width: 'fit-content' }}
      />
      <Select
        multiple
        defaultValue={'5'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        dropdownStyle={{ width: 'fit-content' }}
      />
      <h5>超长可滚动</h5>
      <Select
        defaultValue={'5'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        scrollItem
        scrollSelected
      />
      <Select
        multiple
        defaultValue={'5'}
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        showTag={false}
        scrollItem
        scrollSelected
      />
    </div>
  );
}
```
