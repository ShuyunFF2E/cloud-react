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
	Toggle
} from 'cloud-react';


const { RangePicker, TimeRangePicker } = DatePicker;

export default class RangePickerDemo extends React.Component {
	state = {
		values: { start: '2021/12/1 16:05:33', end: '2021/12/2 12:40:15' },
		times: { start: '09:00:00', end: '17:58:58' }
	}

	onChange = values => {

		this.setState({ values });
	}

	onTimeChange = times => {
		console.log('times:', times);
		this.setState({ times });
	}

	render() {
		const { values, times, disabled } = this.state;
		return (
			<Form layout="horizontal" labelAlign="left" labelCol={{ span: 10 }}>

				<Form.Item label="是否可用">
					<Toggle checked={!disabled} onChange={b => this.setState({ disabled: !b })} />
				</Form.Item>

				<Form.Item label="日期范围选择器">
					<RangePicker value={values} onChange={this.onChange} showToday disabled={disabled} />
				</Form.Item>

				<Form.Item label="日期范围选择器（可清除）">
					<RangePicker value={values} onChange={this.onChange} allowClear disabled={disabled} />
				</Form.Item>

				<Form.Item label="日期范围选择器（带时间）">
					<RangePicker
						value={values}
						onChange={this.onChange}
						onOK={this.onOK}
						showTimePicker
						showNow
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
					minDate={new Date()}
					format={'yyyy年MM月DD日 HH:mm'}
				/>

			</Form>
		);
	}
}
```
