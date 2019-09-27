---
order: 7
title: 日期面板自适应位置
desc: 根据当前组件所在位置自动调整。
---

````javascript
import React from 'react';
import DatePicker from 'cloud-react/datepicker';


export default class DatePickerDemo extends React.Component {
	
	render() {
		return (
			<div>
			  	<DatePicker id="dp1" position="AUTO" placeholder="根据元素空间自动位置" />
			  	<br /><br />
			  	<DatePicker id="dp2" position="UP" placeholder="向上打开" />
			  	<br /><br />
			  	<DatePicker id="dp3" position="DOWN" placeholder="向下打开"  />
			</div>
		);
	}
}
````
