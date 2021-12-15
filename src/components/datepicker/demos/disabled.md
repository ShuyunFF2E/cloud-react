---
order: 6
title: 禁用
desc: 选择框的不可用状态。
---

```jsx

            /**
             * title: 禁用
             * desc: 选择框的不可用状态。
             */
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatepickerDemo extends React.Component {
	render() {
		return (
			<div>
				<Datepicker.YearPicker disabled value=""  />
				<br />
				<br />
				<Datepicker.YearMonthPicker disabled value=""  />
				<br />
				<br />
				<Datepicker.MonthDayPicker disabled value="" />
				<br />
				<br />
				<Datepicker.TimePicker disabled value="" />
				<br />
				<br />
				<Datepicker disabled  />
				<br />
				<br />
				<Datepicker disabled showTimePicker={true}  />
				<br />
				<br />
			</div>
		);
	}
}
```
