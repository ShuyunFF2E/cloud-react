---
order: 3
title: 三种大小
desc: 三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 36px 和 28px ，默认高度为 32px。
---

```jsx
/**
 * title: 三种大小
 * desc: 三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 36px 和 28px ，默认高度为 32px。
 */
import React, { useState } from 'react';
import { Select, Button } from 'cloud-react';

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

  const blank = '\u00A0';
  const [size, setSize ] = useState('default');

  return (
    <div className="demo">
      <div style={{ marginBottom: 15 }}>
        <Button size="large" onClick={() => setSize('large')}>大尺寸</Button>
        {blank}
        <Button size="default" onClick={() => setSize('default')}>默认</Button>
        {blank}
        <Button size="small" onClick={() => setSize('small')}>小尺寸</Button>
        {blank}
        <Button type="link">
          current: {size}
        </Button>
      </div>
      <Select defaultValue={'3'} size={size} style={{ width: 120 }}>
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        allowClear
        searchable
        size={size}
        style={{ width: 150 }}
        multiple
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        size={size}
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
        searchable
        size={size}
        style={{ width: 120 }}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select
        size={size}
        style={{ width: 120 }}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} disabled={item.disabled} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Select dataSource={[]} size={size} style={{ width: 220 }} />
    </div>
  );
}
```
