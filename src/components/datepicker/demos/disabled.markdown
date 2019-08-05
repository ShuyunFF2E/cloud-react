---
order: 3
title: disabled
desc: 禁止修改。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			   <DatePicker disabled={true} />
			   <br /><br />
			   <DatePicker.RangePicker disabled={true} />
			   <br />
			   <br />
			   <DatePicker.TimePicker disabled={true} />
			</div>
		);
	}
}
````
