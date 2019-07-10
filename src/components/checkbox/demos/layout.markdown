---
order: 1
title: Checkbox
desc: Checkbox 布局
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';
import Button from 'ccms-components-react/button';


export default function RadioDemo() {
	
	const [isVertical, setVertical] = useState(true);
	const toggleVertical = () => {
		setVertical(!isVertical);
	};
	
	
	return (
		<div>
			<Checkbox.Group vertical={isVertical} horizontal={!isVertical}>
				<Checkbox value={1} defaultChecked={true}>item 1</Checkbox>
				<Checkbox value={2}>item 2</Checkbox>
				<Checkbox value={3} disabled={true} defaultChecked={true}>item 3</Checkbox>
				<Checkbox value={4}>item 4</Checkbox>
			</Checkbox.Group>
			<br/>
			<Button style={{ marginTop: '20px' }} size={'small'} type="primary" onClick={toggleVertical}>{ isVertical ? '横向布局' : '纵向布局' }</Button>
		</div>
                	
	)
}
````
