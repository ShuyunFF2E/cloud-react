---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 基本使用
 * desc: 多选下拉带不限
 */
import React, { useState, useEffect } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: '不限语言',
    value: '',
  },
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
  const [v, setValue] = useState([]);
  const [multiDataList, setDataList] = useState(dataList);
  
  useEffect(() => {
    setTimeout(() => {
      setValue(['1', '2'])
    }, 1000)
  }, [])
  return (
    <div className="demo">
      <Select
        value={v}
        onChange={values => {
          setValue(values);
        }}
        style={{ width: 328 }}
        multiple
        supportUnlimited
        searchable
        supportLightText
        unlimitedLabel="不限语言"
        dataSource={multiDataList}
      />
    </div>
  );
}
```
