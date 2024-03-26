---
order: 1 title: Checkbox.Group desc: 组合
---

```jsx

/**
 * title: Checkbox.Group
 * desc: 组合
 */
import React, { useState } from 'react';
import { Checkbox } from 'cloud-react';

export default function RadioDemo() {
  const [list, setList] = useState([
    { label: 'item 1', value: 1 },
    { label: 'item 2', value: 2 },
    { label: 'item 3', value: 3 },
  ]);
  const [value, setCheckedValue] = useState([1]);
  const [checked, setCheckedAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  const handleChange = value => {
    console.log('handleChange', value);
    setCheckedValue([...value]);
    setIndeterminate(value.length > 0 && value.length < list.length);
    setCheckedAll(value.length === list.length);
  };

  const handleCheckAll = (checked, val) => {
    console.log('handleCheckAll', checked, val);
    checked ? setCheckedValue(list.map(item => item.value)) : setCheckedValue([]);
    setIndeterminate(false);
    setCheckedAll(checked);
  };
  
  console.log(list);

  return (
    <div>
      <h3>纵向布局-最多可选两项</h3>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16 }}>
        <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleCheckAll}>
          check all
        </Checkbox>
        <Checkbox.Group value={value} disabled={false} onChange={handleChange} layout={'v'} style={{ gap: 16 }}>
          {list.map(item => (
            <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <h3>横向布局</h3>
      <div style={{ display: 'inline-flex', gap: 16 }}>
        <Checkbox checked={checked} indeterminate={indeterminate} onChange={handleCheckAll}>
          check all
        </Checkbox>
        <Checkbox.Group value={value} disabled={false} onChange={handleChange} layout={'h'} style={{ gap: 16 }}>
          {list.map(item => (
            <Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    </div>
  );
}
```
