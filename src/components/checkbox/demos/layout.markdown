---
order: 1
title: Checkbox
desc: Checkbox 布局
---

```javascript
import React from 'react';
import { Checkbox } from 'cloud-react';

export default function RadioDemo() {
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
				<Checkbox value={1} defaultChecked>
					item 1
				</Checkbox>
				<Checkbox value={2}>item 2</Checkbox>
				<Checkbox value={3} disabled defaultChecked>
					item 3
				</Checkbox>
				<Checkbox value={4}>item 4</Checkbox>
			</Checkbox.Group>
		</div>
	);
}
```
