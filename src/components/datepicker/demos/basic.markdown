---
order: 1
title: 基本
desc: 最简单的用法，在浮层中选择日期。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			   <DatePicker defaultValue={new Date()} />
			   <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
			</div>
		);
	}
}
````
