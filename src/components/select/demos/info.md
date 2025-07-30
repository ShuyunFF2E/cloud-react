---
order: 2
title: 基本使用
desc: 基本使用
---

```jsx
/**
 * title: 下拉选项释义
 * desc: 下拉选项释义
 */
import React, { useState } from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: 'JQuery',
    value: '1',
    selectInfo: 'JQueryJQueryJQueryJQueryJQueryJQueryJQueryJQueryJQuery'
  },
  {
    label: 'Vue',
    value: '2'
  },
  {
    label: 'React',
    value: '3',
    selectInfo: 'ReactReactReactReactReactReactReactReactReact'
  },
  {
    label: 'Angular',
    value: '4',
    selectInfo: '11212122'
  },
  {
    label: 'Angular1',
    value: '41',
    selectInfo: '11212122'
  },
  {
    label: 'Angular2',
    value: '42',
    selectInfo: '11212122'
  },
  {
    label: 'Angular3',
    value: '43',
    selectInfo: '11212122'
  },
  {
    label: 'Angular4',
    value: '44',
    selectInfo: '11212122'
  },
  {
    label: 'Angular5',
    value: '45',
    selectInfo: '11212122'
  },
  {
    label: 'Angular6',
    value: '46',
    selectInfo: '11212122'
  },
  {
    label: 'Angular7',
    value: '47',
    selectInfo: '11212122'
  },
];

export default function SelectDemo() {
  const handleChange = (value, prevValue) => {
    console.log('select --- ' + value);
    console.log('prevSelect --- ' + prevValue);
  };

  return (
    <div className="demo">
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <div>
          <h5>单选</h5>
          <Select
            style={{ width: 328 }}
            dropdownConfig={{
              width: 328,
              leftWidth: 128,
              rightWidth: 200
            }}
            allowClear
            onChange={handleChange}
            dataSource={dataList}
            // selectInfoKey="info"
          />
        </div>
        <div>
          <h5>多选</h5>
          <Select
            style={{ width: 328 }}
            dropdownConfig={{
              width: 328,
              leftWidth: 148,
              rightWidth: 180
            }}
            multiple
            allowClear
            onChange={handleChange}
            dataSource={dataList}
            // selectInfoKey="info"
          />
        </div>
      </div>
    </div>
  );
}
```
