---
order: 1
title: Checkbox
desc: 默认样式
---

```jsx

            /**
             * title: Checkbox
             * desc: 默认样式
             */
import React, { useState } from 'react';
import { Checkbox } from 'cloud-react';

export default function CheckboxDemo() {
	const handleChange = (checked, value) => {
		console.log('handleChange', checked, value);
	};

	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(true);

	const handleIndeterminateChange = (checked, value) => {
		console.log('handleIndeterminateChange', value, checked);
		setChecked(!checked);
		setIndeterminate(false);
	};

	return (
		<div>
			<Checkbox>default</Checkbox>
			<br />
			<Checkbox defaultChecked={true} onChange={handleChange} value={1}>
				checked
			</Checkbox>
			<br />
			<Checkbox indeterminate={indeterminate} defaultChecked={checked} onChange={handleIndeterminateChange} value={2}>
				indeterminate
			</Checkbox>
			<br />
			<Checkbox disabled>disabled</Checkbox>
			<br />
			<Checkbox disabled defaultChecked>disabled</Checkbox>
		</div>
	);
}
```
