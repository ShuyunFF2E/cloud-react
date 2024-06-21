---
order: 5
title: 模糊搜索
desc: 可对选项进行搜索
---

```jsx
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
  }
];

export default function SelectDemo() {
  const handleChange = (value) => {
    console.log('select --- ' + value);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      <div>
        <h5>上左</h5>
        <Select
          allowClear
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          position="top"
          dropdownStyle={{ width: 200 }}
        />
      </div>
      <div>
        <h5>上右</h5>
        <Select
          allowClear
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          position="top"
          dropdownStyle={{ width: 200, right: 0 }}
        />
      </div>
      <div>
        <h5>下左</h5>
        <Select
          allowClear
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          position="bottom"
          dropdownStyle={{ width: 200 }}
        />
      </div>
      <div>
        <h5>下右</h5>
        <Select
          allowClear
          onSearch={handleSearch}
          onChange={handleChange}
          style={{ width: 328 }}
          dataSource={dataList}
          position="bottom"
          dropdownStyle={{ width: 200, right: 0 }}
        />
      </div>
    </div>
  );
}
```
