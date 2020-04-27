---
order: 5
title: 时间选择器
desc: 基本用法，时间选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '22:12:56'
		};
	}

	handleChange = value => {
		console.log(value);
	};

	onChange = value => {
		console.log(value);
		this.setState({
			value: value.hour + ':' + value.minute + ':' + value.second
		});
	};

	render() {
		return (
			<div>
				<Datepicker.TimePicker onChange={this.handleChange} />
				<br />
				<br />
				<Datepicker.TimePicker value={this.state.value} onChange={this.onChange} />
			</div>
		);
	}
}
```
