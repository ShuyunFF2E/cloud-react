---
order: 2
title: 日期格式
desc: 使用 `format` 属性，可以自定义日期显示格式。
---

````javascript
import React from 'react';
import DatePicker from 'ccms-components-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			   <DatePicker format="MM/dd/yyyy" />
			</div>
		);
	}
}
````
