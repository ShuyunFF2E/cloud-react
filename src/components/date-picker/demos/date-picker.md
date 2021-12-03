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
import { DatePicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onChange = (date, dateString) => {
		console.log(date, dateString);
	}

	render() {
		return (
			<DatePicker onChange={this.onChange} />
		);
	}
}
```
