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
		return (
			<div>
				<Datepicker.YearPicker placeholder="请选择年份" min={2014} max={2034} onChange={this.onInpChange} showThisYear={true} />
				<br />
			</div>
		);
	}
}
```
