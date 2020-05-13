---
order: 2
title: 年/月选择器
desc: 基本用法，年/月选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onChange = value => console.log(value);

	render() {
		return <Datepicker.YearMonthPicker onChange={this.onChange} min="2018/04" />;
	}
}
```
