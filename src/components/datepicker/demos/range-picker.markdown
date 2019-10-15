---
order: 6
title: 区间选择器
desc: 基本用法，区间选择器。
---

````javascript
import React from 'react';
import DatePicker from 'cloud-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			  	<DatePicker.RangePicker id="r1"  minDate={new Date('2018/07/03')} maxDate={new Date('2019/10/23')} />
			</div>
		);
	}
}
````
