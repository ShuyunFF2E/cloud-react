---
order: 2
title: Radio.Group
desc: 控制内部Radio是否禁用
---

```jsx
/**
 * title: Radio.Group
 * desc: 控制内部Radio是否禁用
 */
import React, { useState } from 'react';
import { Button, Radio } from 'cloud-react';

export default function RadioDemo() {
  const [disabled, setDisabled] = useState(false);
  const [disRadio, setDisRadio] = useState(false);

  const onClick = () => {
    setDisabled(!disabled);
  };

  const onExchangeRadio = () => {
    setDisRadio(!disRadio);
  };

  return (
    <>
      <Radio.Group defaultValue={1} horizontal disabled={disabled}>
        <Radio value={1}>选项A</Radio>
        <Radio value={2} disabled={disRadio}>
          选项B
        </Radio>
      </Radio.Group>
      <br/>
      <br/>
      <Button size={'small'} type="primary" onClick={onClick}>
        全部禁用
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        size={'small'}
        type="primary"
        onClick={onExchangeRadio}
      >
        禁用选项B
      </Button>
    </>
  );
}
```
