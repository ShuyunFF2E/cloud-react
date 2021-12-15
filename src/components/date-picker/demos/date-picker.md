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
	Form,
	Toggle
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
		const { value, time, disabled } = this.state;
		return (
			<Form layout="horizontal" labelAlign="left" labelCol={{ span: 8 }}>
				<Form.Item label="是否可用">
					<Toggle checked={!disabled} onChange={b => this.setState({ disabled: !b })} />
				</Form.Item>
				<Form.Item label="日期选择器">
					<DatePicker value={value} onChange={this.onChange} showToday disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期选择器（可清除）">
					<DatePicker value={value} onChange={this.onChange} allowClear disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期选择器（不可输入修改）">
					<DatePicker value={value} onChange={this.onChange} canEdit={false} disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期选择器（带时间）">
					<DatePicker value={value} onChange={this.onChange} showToday showTimePicker disabled={disabled} />
				</Form.Item>
				<Form.Item label="时间选择器">
					<TimePicker value={time} onChange={this.onTimeChange} disabled={disabled} />
				</Form.Item>
			</Form>
		);
	}
}
```
