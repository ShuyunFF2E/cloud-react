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
  const [multiDataList, setDataList] = useState(dataList);
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <Select
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
      <br/>
      <Select
        placeholder="多选有tag"
        onChange={values => {
          if (values.length > 1) {
            setDataList(multiDataList.map((item, index) => ({
              ...item,
              disabled: !values.includes(item.value)
            })))
          } else {
            setDataList(multiDataList.map((item, index) => ({
              ...item,
              disabled: false
            })))
          }
        }}
        style={{ width: 220 }}
        multiple
      >
        {multiDataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={`${index}-${item.disabled}`}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="多选无tag"
        style={{ width: 220 }}
        multiple
        showTag={false}
      >
        {multiDataList.map((item, index) => (
          <Option value={item.value} key={`${index}-${item.disabled}`}>
            {item.label}
          </Option>
        ))}
      </Select>
      <br/>
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
    </div>
  );
}
```
