---
order: 4
title: Checkbox.Group
desc: 控制内部Checkbox是否禁用
---

````javascript
import React, { useState } from 'react';
import Checkbox from 'ccms-components-react/checkbox';
import Button from 'ccms-components-react/button';

const value = ['c'];

export default function CheckboxDemo() {
	
	const style = { margin: '10px 5px 10px 0' };
	const [disabled, setDisabled] = useState(false);
    	
    const onClick = () => {
    	setDisabled(!disabled);
    };
	
	return (
		<>
			<Checkbox.Group style={style} disabled={disabled}>
        		<Checkbox value={'a'}>A</Checkbox>
        		<Checkbox value={'b'}>B</Checkbox>
        		<Checkbox value={'c'}>C</Checkbox>
        	</Checkbox.Group>
        	<div />
			<Checkbox.Group value={value} style={style} disabled={disabled}>
        		<Checkbox.Card style={style} value={'a'}>AAAAAAAAAAAA</Checkbox.Card>
        		<Checkbox.Card style={style} value={'b'}>BBBBBBBBBBBB</Checkbox.Card>
        		<Checkbox.Card style={style} value={'c'}>CCCCCCCCCCCC</Checkbox.Card>
        	</Checkbox.Group>
        	<br/>
            <Button style={style} size={'small'} type="primary" onClick={onClick}>toggle disabled</Button>
		</>
	)
}
````
