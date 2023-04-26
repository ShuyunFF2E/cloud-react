---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 基本使用
 * desc: 基本使用
 */
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
];

export default function SelectDemo() {
  const [value, setValue] = useState('4');
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };
  const handleChange1 = value => {
    setValue(value);
  }

  return (
    <div className="demo">
      <Select
        allowClear
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 120 }}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        defaultValue={'3'}
        disabled
        onChange={handleChange}
        style={{ width: 120 }}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 120 }}
        multiple
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        defaultValue={'3'}
        onChange={handleChange}
        style={{ width: 120 }}
        allowClear
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select dataSource={[]} style={{ width: 220 }}></Select>
      <Select
        value={value}
        onChange={handleChange1}
        style={{ width: 120 }}
        dataSource={dataList}
      />
    </div>
  );
}
```
