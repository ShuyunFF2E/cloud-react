---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			range: { start: '2020-04-23 00:00:00', end: '2020-06-07 23:59:59' },
			value: '2020/07/10'
		};
	}

	onInpChange = range => {
		this.setState({ range });
	};

	onChangeDate = date => {
		console.log(date);
	}

	render() {
		return (
			<div>
				<Datepicker
					isAppendToBody
					value={this.state.value}
					position="auto"
					onChange={this.onChangeDate}
					width="200px"
					placeholder="年月日"
				/>
				<br />
				<br />
				<Datepicker
					position="auto"
					value="2021/01/07"
					showTimePicker={true}
					placeholder="年月日 时分秒"
				/>
				<br />
				<br />
				<Datepicker.RangePicker
					width={420}
					position="auto"
					value={this.state.range}
					minDate={new Date('2020/3/1')}
					maxDate={new Date('2024/5/1')}
					onChange={this.onInpChange}
					showTimePicker
					isAppendToBody
				/>
			</div>
		);
	}
}
```
