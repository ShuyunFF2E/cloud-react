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
			range: { start: '2020-04-23 00:00:00', end: '2020-06-07 23:59:59' }
		};
	}

	onInpChange = range => {
		this.setState({ range });
	};

	render() {
		return (
			<div>
				<Datepicker
					isAppendToBody
					position="auto"
					width="200px"
					minDate={new Date('2020/05/14 00:00:00')}
					maxDate={new Date('2020/11/5')}
					onChange={this.onInpChange}
					placeholder="年月日"
				/>
				<br />
				<br />
				<Datepicker
					maxDate={new Date('2024/5/1')}
					position="auto"
					minDate={new Date()}
					showTimePicker={true}
					onChange={this.onInpChange}
					placeholder="年月日 时分秒"
				/>
				<br />
				<br />
				<Datepicker.RangePicker
					width={420}
					value={this.state.range}
					minDate={new Date('2020/3/1')}
					maxDate={new Date('2024/5/1')}
					onChange={this.onInpChange}
					showTimePicker
				/>
			</div>
		);
	}
}
```
