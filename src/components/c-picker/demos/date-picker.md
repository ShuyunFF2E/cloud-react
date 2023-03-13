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
import moment from 'moment';
import { 
	CPicker as DatePicker,
	Form,
	Field,
	Toggle
} from 'cloud-react';


const { TimePicker } = DatePicker;

export default class DatePickerDemo extends React.Component {
	field = new Field(this)
	state = {
		value: moment('2021/12/01 16:05:33', 'yyyy/MM/DD HH:mm:ss').toDate(),
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
		const { init } = this.field;
		return (
			<Form field={this.field} layout="horizontal" labelAlign="left" labelCol={{ span: 8 }}>
				<Form.Item label="是否可用">
					<Toggle checked={!disabled} onChange={b => this.setState({ disabled: !b })} />
				</Form.Item>
				<Form.Item label="日期选择器">
					<DatePicker value={value} onChange={this.onChange} disabled={disabled} />
				</Form.Item>
				<Form.Item label="日期选择器（可清除）">
					<DatePicker
						{...init('date', {
							rules: [{
								required: true, message: '请输入时间',
							}]
						})}
						showToday disabled={disabled} autoFocus allowClear
				 	/>
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
				<Form.Item label="时间选择器（不显示秒）">
					<TimePicker value={time} onChange={this.onTimeChange} format="HH:mm" showSecond={false} disabled={disabled} />
				</Form.Item>
			</Form>
		);
	}
}
```
