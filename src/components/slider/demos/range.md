---
order: 1
title: 滑动输入条
desc: 区间
---

```jsx
import React, { useState, useEffect } from "react";
import { Slider } from "cloud-react";

export default function Demo() {
  const [value, setValue] = useState([30, 50]);

  return (
    <div>
      <Slider range value={value} onChange={setValue} />
      <div>
        {value[0]}% - {value[1]}%
      </div>
    </div>
  );
}
```
