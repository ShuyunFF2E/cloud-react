---
order: 1
title: Radio
desc: 单选按钮
---

```jsx
/**
 * title: Radio
 * desc: 单选按钮
 */
import React from 'react';
import { Radio } from 'cloud-react';

export default function RadioDemo() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <Radio value={1} checked={false}>
        未选中
      </Radio>
      <Radio value={2} checked={true}>
        选中
      </Radio>
      <Radio value={3} checked={false} disabled>
        未选中禁用
      </Radio>
      <Radio value={2} checked={true} disabled>
        选中禁用
      </Radio>
    </div>
  );
}
```
