---
order: 1
title: 基本
desc: 数字输入框
---

```javascript
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class InputNumberDemo extends React.Component {
	render() {
		return (
			<>
				<div>
					<InputNumber disabled defaultValue={3} min={-10} max={10} />
				</div>
			</>
		);
	}
}
```
