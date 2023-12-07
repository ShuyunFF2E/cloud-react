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

const { RangePicker } = DatePicker;

const pickerFormatMap = {
  week: 'YYYY年 第w周',
  month: 'YYYY/MM',
  quarter: 'YYYY年 [Q]Q',
  year: 'YYYY年',
};

const transform2DateString = (value, type) => {
  if (!value || !type) return;
  const { start, end } = value;
  return `
    ${moment(start, pickerFormatMap[type]).startOf(type).format('YYYY-MM-DD')}
    ~
    ${moment(end, pickerFormatMap[type]).endOf(type).format('YYYY-MM-DD')}
  `;
}

class RangePickerTypeDemo extends React.Component {
	field = new Field(this)
	state = {
		week: { start: '2023年 第24周', end: '2023年 第30周' },
		month: { start: '2023/04', end: '2023/07' },
		quarter: { start: '2022年 Q3', end: '2023年 Q2' },
		year: { start: '2022年', end: '2023年' },
	}

	onWeekChange = week => {
		console.log('week:', week);
		this.setState({ week });
	}

	onMonthChange = month => {
		console.log('month:', month);
		this.setState({ month });
	}

	onQuarterChange = quarter => {
		console.log('quarter:', quarter);
		this.setState({ quarter });
	}

	onYearChange = year => {
		console.log('year:', year);
		this.setState({ year });
	}

	render() {
		const { week, month, quarter, year } = this.state;
		const { init } = this.field;
		return (
			<Form field={this.field} layout="horizontal" labelAlign="left" labelCol={{ span: 10 }}>

				<Form.Item label="周范围选择器">
                  <RangePicker
                    style={{ width: 284 }}
                    type="week"
                    format={pickerFormatMap.week}
                    value={week}
                    onChange={this.onWeekChange}
                    disabledDate={(_, m) => m.clone().startOf('day').isSameOrAfter(moment().startOf('week'))}
                    presets={[
                      {
                        label: '前三周',
                        value: () => [moment().clone().subtract(3, 'weeks').startOf('week'), moment().clone().subtract(1, 'weeks').startOf('week')]
                      }
                    ]}
                  />
				</Form.Item>

				<Form.Item label="月范围选择器">
                  <RangePicker
                    style={{ width: 284 }}
                    type="month"
                    format={pickerFormatMap.month}
                    value={month}
                    onChange={this.onMonthChange}
                    presets={[
                      {
                        label: 'Q1',
                        value: () => [moment().clone().month(0).startOf('month'), moment().clone().month(2).endOf('month')]
                      },
                      {
                        label: 'Q2',
                        value: () => [moment().clone().month(3).startOf('month'), moment().clone().month(5).endOf('month')]
                      },
                      {
                        label: 'Q3',
                        value: () => [moment().clone().month(6).startOf('month'), moment().clone().month(8).endOf('month')]
                      },
                      {
                        label: 'Q4',
                        value: () => [moment().clone().month(9).startOf('month'), moment().clone().month(11).endOf('month')]
                      },
                    ]}
                  />
				</Form.Item>

				<Form.Item label="季度范围选择器">
				  <RangePicker
                    style={{ width: 284 }}
                    type="quarter"
                    format={pickerFormatMap.quarter}
                    value={quarter}
                    onChange={this.onQuarterChange}
                    presets={[
                      {
                        label: '上半年',
                        value: () => [moment().clone().startOf('year'), moment().clone().quarter(2).endOf('quarter')]
                      },
                      {
                        label: '下半年',
                        value: () => [moment().clone().quarter(3).startOf('quarter'), moment().clone().endOf('year')]
                      }
                    ]}
                  />
				</Form.Item>

				<Form.Item label="年范围选择器">
					<RangePicker
                        style={{ width: 284 }}
                        type="year"
                        format={pickerFormatMap.year}
                        value={year}
                        onChange={this.onYearChange}
                        presets={[
                          {
                            label: '本世纪',
                            value: () => [moment().clone().year(2000).startOf('year'), moment().clone().endOf('year')]
                          },
                          {
                            label: '前 5 年',
                            value: () => [moment().clone().subtract(5, 'years').startOf('quarter'), moment().clone().subtract(1, 'years').endOf('year')]
                          }
                        ]}
                      />
				</Form.Item>

				<Form.Item label="传给后端日期格式">
					<ul>
                    <li>周：{transform2DateString(week, 'week')}</li>
                    <li>月：{transform2DateString(month, 'month')}</li>
                    <li>季：{transform2DateString(quarter, 'quarter')}</li>
                    <li>年：{transform2DateString(year, 'year')}</li>
                  </ul>
				</Form.Item>

			</Form>
		);
	}
}
export default RangePickerTypeDemo;
```
