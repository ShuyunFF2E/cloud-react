---
order: 2
title: Radio.Group
desc: 控制内部Radio是否禁用
---

````javascript
import React, { useState } from 'react';
import { Button, Radio } from 'cloud-react';

export default function RadioDemo() {

	const style = { marginTop: '20px' };
	const [disabled, setDisabled] = useState(false);

	const onClick = () => {
		setDisabled(!disabled);
	};


	return (
		<div>
			<Radio.Group defaultValue={1} horizontal disabled={disabled}>
                  <Radio value={1}>disabled</Radio>
                  <Radio value={2}>disabled</Radio>
            </Radio.Group>
            <br/>
            <Button style={style} size={'small'} type="primary" onClick={onClick}>toggle disabled</Button>
		</div>

	)
}
````
