---
order: 1
title: Checkbox
desc: 受控的 Checkbox
---

```javascript
import React, { useState } from 'react';
import { Button, Checkbox } from 'cloud-react';

export default function RadioDemo() {
	const style = { marginTop: '20px', marginRight: '10px' };
	const [checked, setChecked] = useState(true);
	const [disabled, setDisabled] = useState(false);

	const onCheckedClick = () => {
		setChecked(!checked);
	};

	const onDisabledClick = () => {
		setDisabled(!disabled);
	};

	const handleChange = checked => {
		setChecked(checked);
	};

	return (
		<div>
			<Checkbox value={2} disabled={disabled} checked={checked} onChange={handleChange}>
				受控的 Checkbox
			</Checkbox>
			<br />
			<Button style={style} size={'small'} type="primary" onClick={onCheckedClick}>
				{checked ? 'UnChecked' : 'Checked'}
			</Button>
			<Button style={style} size={'small'} type="primary" onClick={onDisabledClick}>
				{disabled ? 'Enable' : 'Disabled'}
			</Button>
		</div>
	);
}
```
