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
	onChange = (date, dateString) => {
		console.log(date, dateString);
	}

	render() {
		const disabled = false;
		return (
			<Form layout="horizontal">
				<Form.Item label="日期选择器">
					<DatePicker onChange={this.onChange} showTime disabled={disabled} />
				</Form.Item>
				<Form.Item label="时间选择器">
					<TimePicker onChange={this.onChange} disabled={disabled} />
				</Form.Item>
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
			</Form>
		);
	}
}
```
