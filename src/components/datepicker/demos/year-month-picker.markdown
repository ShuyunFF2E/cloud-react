---
order: 2
title: 年/月选择器
desc: 基本用法，年/月选择器。
---

````javascript
import React from 'react';
import DatePicker from 'cloud-react/datepicker';


export default class DatePickerDemo extends React.Component {
	onChange = value => console.log(value);
	
	render() {
		return (
			<div>
			   <DatePicker.YearMonthPicker  onChange={this.onChange} placeholder="请选择年月" min="2018/04" showThisMonth={true}  />
			   <br />
			</div>
		);
	}
}
````
