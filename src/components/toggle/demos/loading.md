---
order: 4
title: 加载状态
desc:
---

```jsx
import React, { useState } from "react";
import { Button, Toggle } from "cloud-react";

export default function ToggleSizeDemo() {
  const [checked, setChecked] = useState(true);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  return (
    <>
      <div style={{ display: "flex", gap: 20 }}>
        <Toggle checked={true} loading />
        <Toggle checked={false} loading disabled />
        <Toggle checked={true} checkedText="开" unCheckedText="关" loading />
        <Toggle
          checked={false}
          checkedText="开"
          unCheckedText="关"
          loading
          disabled
        />
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
        <Toggle checked={true} loading size="small" />
        <Toggle checked={false} loading disabled size="small" />
        <Toggle
          checked={true}
          checkedText="开"
          unCheckedText="关"
          loading
          size="small"
        />
        <Toggle
          checked={false}
          checkedText="开"
          unCheckedText="关"
          loading
          disabled
          size="small"
        />
      </div>
    </>
  );
}
```
