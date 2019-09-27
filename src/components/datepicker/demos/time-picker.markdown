---
order: 5
title: 时间选择器
desc: 基本用法，时间选择器。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	onChange = value => console.log(value);
	
	render() {
		return (
			<div>
			   <DatePicker.TimePicker onChange={this.onChange} />
			</div>
		);
	}
}
````
