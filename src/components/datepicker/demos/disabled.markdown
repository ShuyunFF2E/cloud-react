---
order: 5
title: 禁用
desc: 选择框的不可用状态。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			   <DatePicker.YearPicker disabled value="" placeholder="年" />
			   <br /><br />
			   <DatePicker.YearMonthPicker disabled value="" placeholder="年月" />
			   <br /><br />
			   <DatePicker.MonthDayPicker disabled value="" placeholder="月日" />
			   <br /><br />
			   <DatePicker.TimePicker disabled value="" />
			   <br /><br />
			   <DatePicker disabled showToday={true} placeholder="年月日" />
			   <br /><br />
			   <DatePicker disabled showNow={true} mode="DATE_HOUR" showTimePicker={true}  placeholder="年月日 时" />
			   <br /><br />
			   <DatePicker disabled showNow={true} mode="DATE_HOUR_MINUTE" showTimePicker={true} placeholder="年月日 时分"/>
			   <br /><br />
			   <DatePicker disabled showNow={true} showTimePicker={true} placeholder="年月日 时分秒"/>
			   <br /><br />
			   <DatePicker.RangePicker disabled />
			   <br /><br />
			</div>
		);
	}
}
````
