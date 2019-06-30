---
order: 5
title: 前后缀
desc: 在输入框前后提供单位
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
						 prefix="$"
						 step={0.1}
						 min={1} 
						 max={10}
                    />
                    {blank}
                    <InputNumber
						 postfix="￥"
						 step={0.1}
						 min={1} 
						 max={10}
						/>
				  	{blank}
					<InputNumber
						 postfix="￥"
						 prefix="$"
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
