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
  },
  {
    label: '数云',
    value: 'sy',
  },
  {
    label: '选中项1',
    value: '1',
  },
  {
    label: '选中项2',
    value: '2',
  },
  {
    label: '选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3选中项3',
    value: '3',
  },
  {
    label: '选中项4',
    value: '4',
  },
  {
    label: '选中项5',
    value: '5',
  },
  {
    label: '选中项6',
    value: '6',
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
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      <div>
        <h5>搜索框在下拉框内（单选）</h5>
        <Select
          searchable
          allowClear
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
          position="auto"
          // size="large"
        />
      </div>
      <div>
        <h5>搜索框在下拉框内（多选）</h5>
        <Select
          hasSelectAll
          multiple
          searchable
          allowClear
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
          // size="large"
        />
      </div>
      <div>
        <h5>搜索框在下拉框外（单选）</h5>
        <Select
          searchable
          searchInBox
          allowClear
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
          // size="large"
        />
      </div>
      <div>
        <h5>搜索框在下拉框外（多选）</h5>
        <Select
          hasSelectAll
          searchable
          searchInBox
          allowClear
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
        />
      </div>
      <div>
        <h5>搜索框在下拉框外（多选限制标签数量）</h5>
        <Select
          hasSelectAll
          searchable
          searchInBox
          allowClear
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
          maxTagCount={1}
        />
      </div>
    </div>
  );
}
```
