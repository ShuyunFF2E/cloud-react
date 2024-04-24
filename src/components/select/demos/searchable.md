---
order: 5
title: 模糊搜索
desc: 可对选项进行搜索
---

```jsx
import React, { useState } from 'react';
import { Select, Checkbox, Radio } from 'cloud-react';

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
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState('default');

  const handleChange = (value) => {
    console.log('select --- ' + value);
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      <Checkbox checked={disabled} onChange={checked => {
        setDisabled(checked)
      }}>禁用</Checkbox>
      <Radio.Group value={size} onChange={setSize} horizontal>
        <Radio value="large">large</Radio>
        <Radio value="default">default</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <div>
        <h5>搜索框在下拉框外（单选-新）</h5>
        <Select
          size={size}
          searchable
          allowClear
          disabled={disabled}
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
        <h5>搜索框在下拉框外（多选-新）</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
          multiple
          supportLightText
          placeholder="带搜索的下拉多选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          labelKey="name"
          valueKey="userId"
          dataSource={dataList.map(item => ({
            name: item.label,
            userId: item.value
          }))}
        />
      </div>
      <div>
        <h5>搜索框在下拉框外（多选限制标签数量-新）</h5>
        <Select
          size={size}
          hasSelectAll
          searchable
          allowClear
          disabled={disabled}
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
      <div>
        <h5 style={{ color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>搜索框在下拉框内（单选-旧）</h5>
        <Select
          size={size}
          searchable
          searchInBox={false}
          allowClear
          disabled={disabled}
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
          position="auto"
        />
      </div>
      <div>
        <h5 style={{ color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>搜索框在下拉框内（多选-旧）</h5>
        <Select
          size={size}
          hasSelectAll
          multiple
          searchable
          searchInBox={false}
          showTag={false}
          allowClear
          disabled={disabled}
          supportLightText
          placeholder="带搜索的下拉单选"
          onSearch={handleSearch}
          onChange={handleChange}
          style={{width: 260}}
          dataSource={dataList}
        />
      </div>
    </div>
  );
}
```
