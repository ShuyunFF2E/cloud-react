---
order: 1
title: Checkbox
desc: Checkbox 布局
---

```jsx
/**
 * title: Checkbox
 * desc: Checkbox 布局
 */
import React from "react";
import { Checkbox } from "cloud-react";

export default function RadioDemo() {
  const list = [
    { value: 1, label: "item1", defaultChecked: true },
    { value: 2, label: "item2", defaultChecked: true, disabled: true },
    { value: 3, label: "item3" },
    { value: 4, label: "item4" },
    { value: 5, label: "item5" },
    { value: 6, label: "item6" },
    { value: 7, label: "item7" },
  ];
  return (
    <div>
      <h5>纵向布局</h5>
      <Checkbox.Group layout={"v"} style={{ gap: 16 }}>
        <Checkbox value={1} defaultChecked={true}>
          item 1
        </Checkbox>
        <Checkbox value={2}>item 2</Checkbox>
        <Checkbox value={3} disabled defaultChecked>
          item 3
        </Checkbox>
        <Checkbox value={4}>item 4</Checkbox>
      </Checkbox.Group>
      <h5>横向布局</h5>
      <Checkbox.Group layout={"h"}>
        {list.map((item) => (
          <Checkbox key={item.value} {...item}>
            {item.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
}
```
