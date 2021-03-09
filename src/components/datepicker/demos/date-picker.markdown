---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```javascript
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			value1: '2020/07/10',
            value: '2020/07/10',
		};
	}

	onChangeDate = date => {
		console.log('最终数值--', date);
	}

	render() {
		return (
			<div>
                <div>
                    不可编辑：<Datepicker isAppendToBody
                         				 value={this.state.value}
                         				 position="auto"
                         				 onChange={this.onChangeDate}/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                            <Datepicker isAppendToBody
                                        canEdit={true}
                                        minDate={'1990/3/1'}
                                        maxDate={new Date('2024/5/1')}
                         				value={this.state.value1}
                         				position="auto"
                         				onChange={this.onChangeDate}/>
                </div>
				<br />
				<br />
                <div>
                    不可编辑：<Datepicker position="auto" value="2021/01/07" showTimePicker={true} onChange={this.onChangeDate}/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                    <Datepicker canEdit={true} position="auto" value="2021/01/07" showTimePicker={true} onChange={this.onChangeDate}/>
                </div>
			</div>
		);
	}
}
```
