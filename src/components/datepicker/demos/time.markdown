---
order: 4
title: 时间选择
desc: 独立的时间选择器。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';

export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
				<DatePicker format="yyyy/MM/dd hh:mm:ss" showToday={true} showTimePicker={true} />
							   <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
				<DatePicker.RangePicker format="yyyy/MM/dd" showToday={false} showTimePicker={false} />
							   <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
				<DatePicker.TimePicker />
				 <br /> <br /> <br /> <br />
			</div>
		);
	}
}
````
