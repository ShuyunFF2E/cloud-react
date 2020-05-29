---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```javascript
import React from 'react';
import { Datepicker, Button } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			range: { start: '2020-04-23 00:00:00', end: '2020-06-07 23:59:59' }
		};
	}
	onInpChange = value => console.log(value);

	setRangeValue = () => {
		this.setState({
			range: {}
		});
	};

	render() {
		return (
			<div>
				<Datepicker
					width="200px"
					minDate={new Date('2020/05/14 00:00:00')}
					maxDate={new Date('2020/11/5')}
					onChange={this.onInpChange}
					placeholder="年月日"
				/>
				<br />
				<br />
				<Datepicker maxDate={new Date('2024/5/1')} minDate={new Date()} showTimePicker={true} onChange={this.onInpChange} placeholder="年月日 时分秒" />
				<br />
				<br />
				<div style={{ display: 'flex' }}>
					<Datepicker.RangePicker
						width="420px"
						showTimePicker={false}
						value={this.state.range}
						minDate={new Date('2020/3/1')}
						maxDate={new Date('2024/5/1')}
						showTimePicker
						onChange={this.onInpChange}
					/>
					<Button onClick={this.setRangeValue} style={{ marginLeft: 10 }}>
						设置range值
					</Button>
				</div>
			</div>
		);
	}
}
```
