---
order: 3
title: 月/日选择器
desc: 基本用法，月/日选择器。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	onChange = value => console.log(value);
	render() {
		return (
			<div>
			   <DatePicker.MonthDayPicker id="m1" onChange={this.onChange} showToday placeholder="请选择月日" />
			   <br />
			</div>
		);
	}
}
````
