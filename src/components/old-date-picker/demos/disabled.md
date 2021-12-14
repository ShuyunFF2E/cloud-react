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
import { OldDatePicker } from 'cloud-react';

export default class OldDatePickerDemo extends React.Component {
	render() {
		return (
			<div>
				<OldDatePicker.YearPicker disabled value=""  />
				<br />
				<br />
				<OldDatePicker.YearMonthPicker disabled value=""  />
				<br />
				<br />
				<OldDatePicker.MonthDayPicker disabled value="" />
				<br />
				<br />
				<OldDatePicker.TimePicker disabled value="" />
				<br />
				<br />
				<OldDatePicker disabled  />
				<br />
				<br />
				<OldDatePicker disabled showTimePicker={true}  />
				<br />
				<br />
			</div>
		);
	}
}
```
