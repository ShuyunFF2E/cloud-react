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
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: '不限',
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
  const [v, setValue] = useState(['1', '2']);
  const [multiDataList, setDataList] = useState(dataList);
  return (
    <div className="demo">
      <Select
        value={v}
        onChange={values => {
          setValue(values);
        }}
        style={{ width: 120 }}
        multiple
        supportUnlimited
        unlimitedLabel="不限语言"
        dataSource={multiDataList}
      />
    </div>
  );
}
```
