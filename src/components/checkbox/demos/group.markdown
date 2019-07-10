---
order: 1
title: Checkbox.Group
desc: 组合
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';


export default function RadioDemo() {
	
	const groupValue = [1, 2, 3];
	const [checkedValue, setCheckedValue] = useState([1, 2]);
	const [checked, setCheckedAll] = useState(false);
	const [indeterminate, setIndeterminate] = useState(true);

	const handleChange = value => {
		console.log('handleChange', value);
		setCheckedValue([...value]);
		setIndeterminate(value.length > 0 && value.length < groupValue.length);
		setCheckedAll(value.length === groupValue.length);
	};
	
	const handleCheckAll = (checked, val) => {
		console.log('handleCheckAll', val, checked);
		checked ? setCheckedValue(groupValue) : setCheckedValue([]);
		setIndeterminate(false);
		setCheckedAll(checked);
	};
	
	return (
		<div>
			<Checkbox checked={checked} indeterminate={indeterminate} onChange={handleCheckAll}>check all</Checkbox>
			<br/>
			<Checkbox.Group checkedValue={checkedValue} disabled={false} onChange={handleChange} vertical>
				<Checkbox value={1}>item 1</Checkbox>
				<Checkbox value={2}>item 2</Checkbox>
				<Checkbox value={3}>item 3</Checkbox>
			</Checkbox.Group>
		</div>
	)
}
````
