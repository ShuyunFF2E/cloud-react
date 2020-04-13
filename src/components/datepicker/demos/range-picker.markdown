---
order: 6
title: 区间选择器
desc: 基本用法，区间选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	state = {
		date: []
	};

	onChange = date => {
		this.setState(
			{
				date
			},
			() => {
				console.log(this.state.date);
			}
		);
	};

	render() {
		return (
			<div>
				<Datepicker.RangePicker
					showTimePicker
					hasClear
					format="YYYY-MM-DD"
					value={this.state.date}
					onChange={this.onChange}
					minDate={new Date('2018/07/03')}
					maxDate={new Date('2019/10/23 12:12:12')}
				/>
			</div>
		);
	}
}
```
