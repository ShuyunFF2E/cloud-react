---
order: 5
title: 时间选择器
desc: 基本用法，时间选择器。
---

````javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {

	onChange = value => console.log(value);

	render() {
		return (
			<div>
			   <Datepicker.TimePicker onChange={this.onChange} />
			</div>
		);
	}
}
````
