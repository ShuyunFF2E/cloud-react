---
order: 1
title: Checkbox
desc: Checkbox 布局
---

```javascript
import React from 'react';
import { Checkbox } from 'cloud-react';

export default function RadioDemo() {
    const list = [
        { value: 1, label: 'item1', defaultChecked: true },
        { value: 2, label: 'item2', defaultChecked: true, disabled: true },
        { value: 3, label: 'item3' },
        { value: 4, label: 'item4' },
        { value: 5, label: 'item5' },
        { value: 6, label: 'item6' },
        { value: 7, label: 'item7' },
        { value: 8, label: 'item8' },
        { value: 9, label: 'item9' },
        { value: 10, label: 'item10' },
        { value: 11, label: 'item11' },
        { value: 12, label: 'item12' },
        { value: 13, label: 'item13' },
        { value: 14, label: 'item14' },
        { value: 15, label: 'item15' },
    ];
	return (
		<div>
			<h3>纵向布局</h3>
			<Checkbox.Group layout={'v'}>
				<Checkbox value={1} defaultChecked={true}>
					item 1
				</Checkbox>
				<Checkbox value={2}>item 2</Checkbox>
				<Checkbox value={3} disabled defaultChecked>
					item 3
				</Checkbox>
				<Checkbox value={4}>item 4</Checkbox>
			</Checkbox.Group>
			<h3>横向布局</h3>
			<Checkbox.Group layout={'h'}>
                {list.map(item => (
                    <Checkbox style={{ width: 80 }} key={item.value} {...item}>
                        {item.label}
                    </Checkbox>
                ))}
			</Checkbox.Group>
		</div>
	);
}
```
