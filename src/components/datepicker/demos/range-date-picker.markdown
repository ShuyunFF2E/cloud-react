---
order: 5
title: 区间选择器
desc: 基本用法。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			range: { start: '2020/04/23', end: '2020/06/07' },
            range2:  { start: '2020/04/20', end: '2020/06/20' }
		};
	}

	onInpChange = range => {
		// this.setState({ range });
        console.log(range, '不可编辑区间');
	};

	onInpChange2 = range2 => {
        // console.log(range2);
        // this.setState({ range2 });
        console.log(range2, '可编辑区间');
	}

	render() {
		return (
            <>
            <div>
               <p style={{marginBottom: 10}}>不可编辑：</p>
                <Datepicker.RangePicker
               					position="auto"
               					value={this.state.range}
               					minDate={new Date('1998/3/1')}
               					maxDate={new Date('2024/5/1')}
               					onChange={this.onInpChange}
               					isAppendToBody
               				/>
			</div>
			<div>
               <p style={{marginBottom: 10, marginTop: 20}}>可编辑：</p>
                <Datepicker.RangePicker
               					position="auto"
               					value={this.state.range2}
               					minDate={new Date('1990/3/1')}
               					maxDate={new Date('2024/5/1')}
               					onChange={this.onInpChange2}
               					isAppendToBody
                                canEdit
               				/>
			</div>
            </>
		);
	}
}
```
