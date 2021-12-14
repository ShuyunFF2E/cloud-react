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


const { RangePicker, TimeRangePicker } = DatePicker;

export default class RangePickerDemo extends React.Component {
	state = {
		values: ['2021/12/1 16:05:33', '2021/12/2 12:40:15'],
		times: ['09:00:00', '17:58:58']
	}

	onChange = values => {
		console.log('values:', values);
		this.setState({ values });
	}

	onTimeChange = times => {
		console.log('times:', times);
		this.setState({ times });
	}

	render() {
		const { values, times } = this.state;
		const disabled = false;
		return (
			<Form layout="horizontal">
				<Form.Item label="日期范围选择器">
					<RangePicker value={values} onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期范围选择器（带时间）">
					<RangePicker value={values} onChange={this.onChange} onOK={this.onOK} showTimePicker showNow disabled={disabled} />
				</Form.Item>
				<Form.Item label="时间范围选择器">
					<TimeRangePicker value={times} onChange={this.onTimeChange} showNow disabled={disabled} />
				</Form.Item>
			</Form>
		);
	}
}
```
