---
order: 5
title: 模糊搜索
desc: 可对选项进行搜索
---

```jsx
/**
 * title: 模糊搜索
 * desc: 可对选项进行搜索
 */
import React from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: 'React',
    value: 'React',
  },
  {
    label: 'Vue',
    value: 'Vue',
  },
  {
    label: 'Angular',
    value: 'Angular',
  },
];

export default function SelectDemo() {
  const handleChange = (value) => {
    console.log('select --- ' + value);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <Select
        searchable
        supportLightText
        placeholder="带搜索的下拉单选"
        onSearch={handleSearch}
        onChange={handleChange}
        style={{width: 200}}
        dataSource={dataList}
      />
    </>
  );
}
```
