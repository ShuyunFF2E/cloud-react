---
order: 3
title: Checkbox.Group
desc: 组合
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';


export default function CheckboxDemo() {
	
	const style = { margin: '10px 5px 10px 0' };
	const onChange = value => {
		console.log(value);
	}
	
	return (
		<>
			<Checkbox.Group style={style} onChange={onChange}>
        		<span><Checkbox value={'a'}>A</Checkbox></span>
        		<Checkbox value={'b'}>B</Checkbox>
        		<Checkbox value={'c'}>C</Checkbox>
        	</Checkbox.Group>
        	<div />
			<Checkbox.Group value={['c']} style={style}>
        		<Checkbox.Card style={style} value={'a'}>AAAAAAAAAAAA</Checkbox.Card>
        		<Checkbox.Card style={style} value={'b'}>BBBBBBBBBBBB</Checkbox.Card>
        		<Checkbox.Card style={style} value={'c'}>CCCCCCCCCCCC</Checkbox.Card>
        	</Checkbox.Group>
		</>
	)
}
````
