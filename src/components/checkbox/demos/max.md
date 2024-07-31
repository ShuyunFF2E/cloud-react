---
order: 1 title: Checkbox.Group desc: 组合
---

```jsx

/**
 * title: Checkbox
 * desc: 限制勾选数量
 */
import React, { useState } from 'react';
import { Checkbox } from 'cloud-react';

export default function RadioDemo() {
  const [list, setList] = useState([
    { label: 'item 1', value: 1 },
    { label: 'item 2', value: 2 },
    { label: 'item 3', value: 3 },
    { label: 'item 4', value: 4 },
  ]);
  const [checkedValue, setCheckedValue] = useState([]);
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {list.map(item => (
        <Checkbox
          key={item.value}
          value={item.value}
          checked={checkedValue.includes(item.value)}
          disabled={item.disabled}
          onChange={(checked, v) => {
            if (checked) {
              if (!checkedValue.includes(v)) {
                checkedValue.push(v);
                setCheckedValue([...checkedValue]);
              }
            } else {
              if (checkedValue.includes(v)) {
                checkedValue.splice(checkedValue.findIndex(cValue => cValue === v), 1);
                setCheckedValue([...checkedValue]);
              }
            }
            if (checkedValue.length > 1) {
              setList(list.map(item1 => ({
                ...item1,
                disabled: !checkedValue.includes(item1.value)
              })))
            } else {
              setList(list.map(item1 => ({
                ...item1,
                disabled: false
              })))
            }
          }}>
          {item.label}
        </Checkbox>
      ))}
    </div>
  );
}
```
