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


const {
	YearPicker,
	MonthPicker,
	WeekPicker,
	QuarterPicker
} = DatePicker;

class DatePickerDemo extends React.Component {
	field = new Field(this)
	state = {
		year: 2021,
		month: '2021/07',
		monthDay: '06/07',
		week: '2021年 第24周',
		quarter: '2021年 Q3',
	}

	onYearChange = year => {
		console.log('year:', year);
		this.setState({ year });
	}

	onMonthChange = month => {
		console.log('month:', month);
		this.setState({ month });
	}

	onWeekChange = week => {
		console.log('week:', week);
		this.setState({ week });
	}

	onQuarterChange = quarter => {
		console.log('quarter:', quarter);
		this.setState({ quarter });
	}

	onMonthDayChange = monthDay => {
		console.log('monthDay:', monthDay);
		this.setState({ monthDay });
	}

	render() {
		const { year, month, week, quarter, monthDay, disabled } = this.state;
		const { init } = this.field;
		return (
			<Form field={this.field} layout="horizontal" labelAlign="left" labelCol={{ span: 8 }}>
				<Form.Item label="是否可用">
					<Toggle checked={!disabled} onChange={b => this.setState({ disabled: !b })} />
				</Form.Item>
				<Form.Item label="年份选择器">
					<YearPicker
						value={year}
						onChange={this.onYearChange}
						disabled={disabled}
						allowClear
						format="yyyy"
						min={2020}
						max={2025}
						presets={[{ label: '去年', value: () => moment().clone().subtract(1, 'years').startOf('year') }]}
					/>
				</Form.Item>
				<Form.Item label="年月选择器">
					<MonthPicker
						value={month}
						onChange={this.onMonthChange}
						disabled={disabled}
						allowClear
						format="yyyy/MM"
						minYear={2020}
						maxYear={2025}
						minMonth={3}
						maxMonth={10}
						presets={[{ label: '上个月', value: () => moment().clone().subtract(1, 'months').startOf('month') }]}
					/>
				</Form.Item>
				<Form.Item label="周选择器">
					<WeekPicker
						value={week}
						onChange={this.onWeekChange}
						disabled={disabled}
						allowClear
						minYear={2020}
						maxYear={2025}
						presets={[{ label: '上周', value: () => moment().clone().subtract(1, 'weeks').startOf('week') }]}
					/>
				</Form.Item>
				<Form.Item label="季度选择器">
					<QuarterPicker
						value={quarter}
						onChange={this.onQuarterChange}
						disabled={disabled}
						allowClear
						minYear={2020}
						maxYear={2025}
					/>
				</Form.Item>
				<Form.Item label="实现【月-日】选择">
					<DatePicker
					 	value={monthDay}
					  format="MM-DD"
						onChange={this.onMonthDayChange}
						disabled={disabled}
					/>
				</Form.Item>
			</Form>
		);
	}
}
export default DatePickerDemo;
```
