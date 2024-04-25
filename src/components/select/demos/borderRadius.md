---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 自定义圆角
 * desc: 自定义圆角
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
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <Select
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        borderRadiusSize="default"
      />
      <Select
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        borderRadiusSize="medium"
      />
      <Select
        onChange={handleChange}
        style={{ width: 328 }}
        dataSource={dataList}
        borderRadiusSize="large"
      />
    </div>
  );
}
```
