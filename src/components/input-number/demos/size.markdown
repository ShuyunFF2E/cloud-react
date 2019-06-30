---
order: 2
title: 三种大小
desc: 三种大小的数字输入框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。
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
				   <InputNumber size="large" />
				   {blank}
				   <InputNumber size="default" />
				   {blank}
				   <InputNumber size="small" />
				   {blank}
				</div>
			</>
		);
	}
}
````
