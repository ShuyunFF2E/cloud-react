---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	onInpChange = value => console.log(value);

	render() {
		return (
			<div>
				<Datepicker minDate={new Date('2020/05/14 00:00:00')} maxDate={new Date('2020/11/5')} onChange={this.onInpChange} placeholder="年月日" />
				<br />
				<br />
				<Datepicker maxDate={new Date('2024/5/1')} minDate={new Date()} showTimePicker={true} onChange={this.onInpChange} placeholder="年月日 时分秒" />
			</div>
		);
	}
}
```
