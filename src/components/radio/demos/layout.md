---
order: 4
title: Radio.Group
desc: 布局（horizontal|vertical）
---

```jsx
/**
 * title: Radio.Group
 * desc: 布局（horizontal|vertical）
 */
import React from "react";
import { Radio } from "cloud-react";

export default function RadioDemo() {
  return (
    <React.Fragment>
      <h5>横向分布</h5>
      <Radio.Group defaultValue={1} horizontal>
        <Radio value={1}>选项A</Radio>
        <Radio value={2}>选项B</Radio>
        <Radio value={3}>选项C</Radio>
      </Radio.Group>
      <h5>纵向分布</h5>
      <Radio.Group defaultValue={1} vertical>
        <Radio value={1}>选项A</Radio>
        <Radio value={2}>选项B</Radio>
        <Radio value={3}>选项C</Radio>
      </Radio.Group>
    </React.Fragment>
  );
}
```
