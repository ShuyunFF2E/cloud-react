---
order: 3
title: Radio.Group
desc: 组合
---

```jsx
/**
 * title: Radio.Group
 * desc: 组合
 */
import React, { useState } from 'react';
import { Radio } from 'cloud-react';

export default function RadioDemo() {
  const [value, setValue] = useState();

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Radio.Group value={value} defaultValue={1} onChange={onChange}>
      <Radio value={1}>组合选项A</Radio>
      <Radio value={2}>组合选项B</Radio>
      <Radio value={3}>组合选项C</Radio>
    </Radio.Group>
  );
}
```
