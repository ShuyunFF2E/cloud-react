---
order: 5
title: 时间选择
desc: 区间选择器。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';

export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			
				<DatePicker.RangePicker 
					minDate={new Date('2019/7/1')}
				 	maxDate={new Date('2019/9/1')}
				 	format="yyyy/MM/dd" />
				
			</div>
		);
	}
}
````
