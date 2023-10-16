---
order: 5
title: 步数控制样式
desc:  topBottom 上下, leftRight 左右
---

```jsx

/**
 * title: 步数控制样式
 * desc: 两种样式，topBottom 上下，leftRight 左右。
 */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

class InputNumberDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<InputNumber defaultValue={3} size="large" stepType="leftRight"/>
					{blank}
					<InputNumber defaultValue={3} size="default" stepType="leftRight"/>
					{blank}
					<InputNumber defaultValue={3} size="small" stepType="leftRight" disabled/>
				</div>
			</React.Fragment>
		);
	}
}

export default InputNumberDemo;
```
