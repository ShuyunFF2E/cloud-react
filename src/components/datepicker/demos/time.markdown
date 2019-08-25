---
order: 4
title: 区间选择
desc: 设置某个时间段。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';

export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
				<DatePicker format="yyyy/MM/dd hh:mm:ss" showToday={true} showTimePicker={true} />
					<br /> <br />
				<DatePicker.TimePicker />
				 <br /> <br />
			</div>
		);
	}
}
````
