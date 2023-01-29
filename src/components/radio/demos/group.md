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
import { Radio, ComplexRadio } from 'cloud-react';

function WrapComp({ children }) {
  return <div>{children}</div>;
}

export default function RadioDemo() {
  const [value, setValue] = useState();

  const onChange = (value) => {
    console.log('value', value);
    setValue(value);
  };

  return (
    <>
      <Radio.Group value={value} defaultValue={1} onChange={onChange}>
        <Radio value={1}>A</Radio>
        <div><div><Radio value={2}>B</Radio></div></div>
        <div><Radio value={3}>C</Radio></div>
        <WrapComp>
          <Radio value={6}>D</Radio>
        </WrapComp>
      </Radio.Group>
      <br />
      <br />
      <Radio.Group value={value} defaultValue={1} onChange={onChange}>
        <ComplexRadio
            title="A1"
            value={4}
            style={{ width: 'auto' }}
        />
        <ComplexRadio
            title="B1"
            value={5}
        />
      </Radio.Group>
    </>

  );
}
```
