---
order: 2
title: 数字输入框大小
desc: 三种默认尺寸：large、default、small，分别为：36px、32px、28px。
---

```jsx

/**
 * title: 数字输入框大小
 * desc: 三种默认尺寸：large、default、small，分别为：36px、32px、28px。
 */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

class InputNumberDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<InputNumber size="large" defaultValue={3}/>
					{blank}
					<InputNumber size="default" defaultValue={3}/>
					{blank}
					<InputNumber size="small" defaultValue={3} />
					{blank}
				</div>
			</React.Fragment>
		);
	}
}

export default InputNumberDemo;
```
