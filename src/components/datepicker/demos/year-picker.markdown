---
order: 1
title: 年选择器
desc: 基本用法，年选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onInpChange = value => console.log(value);

	render() {
		return <Datepicker.YearPicker min={2014} position="auto" max={2034} onChange={this.onInpChange} />;
	}
}
```
