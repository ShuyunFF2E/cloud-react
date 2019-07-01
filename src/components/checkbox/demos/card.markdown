---
order: 2
title: Checkbox
desc: 多选按钮card
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';


export default function CheckboxDemo() {
	
	const [checked, setChecked] = useState(true);
	
	const onChange = (evt) => {
		setChecked(evt.target.checked);
	};
	
	return <Checkbox.Card width='30%' height={100} value={1} onChange={onChange} checked={checked}>AAAA</Checkbox.Card>
}
````
