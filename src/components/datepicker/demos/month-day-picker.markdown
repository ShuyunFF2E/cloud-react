---
order: 3
title: 月/日选择器
desc: 基本用法，月/日选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onChange = value => console.log(value);
	render() {
		return (
			<div>
				<Datepicker.MonthDayPicker min="06/10" position="auto" onChange={this.onChange} />
			</div>
		);
	}
}
```
