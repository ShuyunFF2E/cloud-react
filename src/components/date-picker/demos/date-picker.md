---
order: 1
title: 日期选择器（新）
desc: 基本用法，日期选择器。
---

```jsx

/**
 * title: 日期选择器
 * desc: 基本用法，日期选择器。
 */
import React from 'react';
import { 
	DatePicker,
	Form
} from 'cloud-react';


const {
	TimePicker,
	WeekPicker,
	MonthPicker,
	YearPicker,
	QuarterPicker
} = DatePicker;

export default class DatePickerDemo extends React.Component {
	state = {
		value: '2021/12/1 16:05:33',
		time: '17:58:58'
	}

	onChange = value => {
		console.log('value:', value);
		this.setState({ value });
	}

	onTimeChange = time => {
		console.log('time:', time);
		this.setState({ time });
	}

	render() {
		const { value, time } = this.state;
		const disabled = false;
		return (
			<Form layout="horizontal">
				<Form.Item label="日期选择器">
					<DatePicker value={value} onChange={this.onChange} showToday disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期选择器（带时间）">
					<DatePicker value={value} onChange={this.onChange} showToday showTimePicker disabled={disabled} />
				</Form.Item>
				<Form.Item label="时间选择器">
					<TimePicker value={time} onChange={this.onTimeChange} disabled={disabled} />
				</Form.Item>
				{/*
				<Form.Item label="周选择器">
					<WeekPicker onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="年月选择器">
					<MonthPicker onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="月日选择器">
					<DatePicker format="MM/DD" onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="年份选择器">
					<YearPicker onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="季度选择器">
					<QuarterPicker onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				*/}
			</Form>
		);
	}
}
```
