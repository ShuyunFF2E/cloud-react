---
order: 1
title: Checkbox
desc: 多选按钮
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';


export default function CheckboxDemo() {
	
	const [checked, setChecked] = useState();
	
	const onChange = (evt) => {
		setChecked(evt.target.checked);
	};
	
	return [
		<Checkbox key={1} value={1} onChange={onChange} checked={checked}>A</Checkbox>,
		<Checkbox key={2} value={2} indeterminate={true} checked={checked}>B</Checkbox>
	]
}
````
