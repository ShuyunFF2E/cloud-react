---
order: 11
title: 指定使用的键值
desc: 指定使用的键值
---

```jsx
/**
 * title: 指定使用的键值
 * desc: 指定使用的键值
 */
import React, { useState } from 'react';
import { Select, Modal, Button, Tabs } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    title: 'React',
    name: 'React',
  },
  {
    title: 'Vue',
    name: 'Vue',
  },
  {
    title: 'Angular',
    name: 'Angular',
  },
];

export default function SelectDemo() {
  const handleChange = (value) => {
    console.log('select --- ' + value);
  };

  return (
    <>
      指定特定的键值key：
      <Select
        labelKey="title"
        valueKey="name"
        onChange={handleChange}
        dataSource={dataList}
      />
    </>
  );
}
```
