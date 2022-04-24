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
  const style = { marginTop: '20px' };
  const [disabled, setDisabled] = useState(false);
  const [disRadio, setDisRadio] = useState(false);

  const onClick = () => {
    setDisabled(!disabled);
  };

  const onExchangeRadio = () => {
    setDisRadio(!disRadio);
  };

  return (
    <div>
      <Radio.Group defaultValue={1} horizontal disabled={disabled}>
        <Radio value={1}>radio 1</Radio>
        <Radio value={2} disabled={disRadio}>
          radio 2
        </Radio>
      </Radio.Group>
      <span>
        {disRadio}
        {disabled}
      </span>
      <br />
      <Button style={style} size={'small'} type="primary" onClick={onClick}>
        切换全部disabled
      </Button>
      <br />
      <Button
        style={style}
        size={'small'}
        type="primary"
        onClick={onExchangeRadio}
      >
        单独切换 radio 2
      </Button>
    </div>
  );
}
```
