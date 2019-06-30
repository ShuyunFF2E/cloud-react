---
order: 4
title: 小数
desc: 和原生的数字输入框一样，value 的精度由 step 的小数位数决定。
---

````javascript
import React from 'react';
import Button from 'ccms-components-react/button';
import InputNumber from 'ccms-components-react/input-number';

const blank = '\u00A0';

export default class InputNumberDemo extends React.Component {
	
	render() {
		return (
			<>
				<div>
				   <InputNumber
				     defaultValue={3}
				     step={0.1}
				     min={1} 
				     max={10}
                    />
				</div>
			</>
		);
	}
}
````
