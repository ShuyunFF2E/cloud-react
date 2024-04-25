---
order: 6
title: 获取选项的文本
desc: >-
  默认情况下onChange只能拿到value，添加labelInValue属性后onChange等函数中拿到的value会变成由label、value组成的对象
---

```jsx
/**
 * title: 获取选项的文本
 * desc: 默认情况下onChange只能拿到value，添加labelInValue属性后onChange等函数中拿到的value会变成由label、value组成的对象
 */
import React from 'react';
import { Select } from 'cloud-react';

const Option = Select.Option;

const dataList = [
  {
    label: '苹果',
    value: 'apple',
  },
  {
    label: '草莓',
    value: 'strawberry',
  },
];

export default function SelectDemo() {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <Select
      style={{ width: 328 }}
      labelInValue
      placeholder="请选择..."
      defaultValue="strawberry"
      onChange={handleChange}
    >
      {dataList.map((item, index) => (
        <Option value={item.value} key={index}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}
```
