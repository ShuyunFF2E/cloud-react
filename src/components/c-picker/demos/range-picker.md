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


const { RangePicker, TimeRangePicker } = DatePicker;

export default class RangePickerDemo extends React.Component {
	field = new Field(this)
	state = {
		values: {
			start: moment('2021/12/10 16:05:33', 'yyyy/MM/DD HH:mm:ss').toDate(),
			end: moment('2021/12/12 08:37:21', 'yyyy/MM/DD HH:mm:ss').toDate()
		},
		times: { start: '09:00:00', end: '17:58:58' }
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
		const { values, times, disabled } = this.state;
		const { init } = this.field;
		return (
			<Form field={this.field} layout="horizontal" labelAlign="left" labelCol={{ span: 10 }}>

				<Form.Item label="是否可用">
					<Toggle checked={!disabled} onChange={b => this.setState({ disabled: !b })} />
				</Form.Item>

				<Form.Item label="日期范围选择器">
					<RangePicker value={values} onChange={this.onChange} disabled={disabled} />
				</Form.Item>

				<Form.Item label="日期范围选择器（可清除）">
					<RangePicker
						{...init('date', {
							rules: [{
								required: true, message: '请输入时间'
							}],
							onChange: v => {
								console.log(v)
							}
						})}
						allowClear
						showToday
						disabled={disabled}
					/>
				</Form.Item>

				<Form.Item label="日期范围选择器（带时间）">
					<RangePicker
						value={values}
						onChange={this.onChange}
						showTimePicker
						showToday
						disabled={disabled}
					/>
				</Form.Item>

				<Form.Item label="日期范围选择器（固定开始时间）">
					<RangePicker
						value={values}
						onChange={this.onChange}
						onOK={this.onOK}
						allowClear
						disabled={[false, true]}
						allowEmpty={[true, false]}
					/>
				</Form.Item>

				<Form.Item label="日期范围选择器（开始结束可为空）">
					<RangePicker
						onOK={this.onOK}
						allowEmpty={[true, true]}
						disabled={disabled}
					/>
				</Form.Item>

				<Form.Item label="时间范围选择器">
					<TimeRangePicker value={times} onChange={this.onTimeChange} showNow disabled={disabled} />
				</Form.Item>

				<h4>自定义</h4>

				<RangePicker
					placeholder="请选择时间范围"
					width={380}
					showTimePicker
					format={'yyyy年MM月DD日 HH:mm'}
					onChange={this.onChange}
					minYear={2021}
					maxYear={2023}
				/>

			</Form>
		);
	}
}
```
