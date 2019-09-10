---
order: 1
title: Radio.Group
desc: 组合
---

````javascript
import React, { useState } from 'react';
import Radio from 'cloud-react/radio';


export default function RadioDemo() {

	const [value, setValue] = useState();

	const onChange = value => {
		setValue(value);
	};

	return (
		<Radio.Group value={value} defaultValue={1} onChange={onChange}>
			<Radio value={1}>A</Radio>
			<Radio value={2}>B</Radio>
			<Radio value={3}>C</Radio>
		</Radio.Group>
	)
}
````
