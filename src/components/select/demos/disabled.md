---
order: 4
title: 是否禁用
desc: 下拉禁用
---

```jsx
/**
 * title: 是否禁用
 * desc: 下拉禁用
 */
import React, { useState } from 'react';
import { Select, Button } from 'cloud-react';

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
    label: 'Jquery',
    value: 'Jquery',
  },
];

export default function SelectDemo() {
  const [disabled, setDisabled] = useState(false);

  const onClick = () => setDisabled(!disabled);

  return (
    <div className="demo">
      <Select
        style={{ marginBottom: '10px' }}
        disabled={disabled}
      >
        {dataList.map((item, index) => (
          <Option value={item.value} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={onClick}>
        修改禁用状态
      </Button>
    </div>
  );
}
```
