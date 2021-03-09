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
                    不可编辑：<Datepicker.MonthDayPicker min="01/10" position="auto" onChange={this.onChange} />
                    <span style={{paddingLeft: 20}}>可编辑</span>：<Datepicker.MonthDayPicker canEdit={true} min="01/10" position="auto" onChange={this.onChange} />
                </div>
                )
	}
}
```
