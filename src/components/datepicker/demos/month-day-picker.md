---
order: 3
title: 月/日选择器
desc: 基本用法，月/日选择器。
---

```jsx

            /**
             * title: 月/日选择器
             * desc: 基本用法，月/日选择器。
             */
import React from 'react';
import { Datepicker } from 'cloud-react';

class DatepickerDemo extends React.Component {
	onChange = value => console.log(value);
	render() {
        return (
                <div>
                    不可编辑：<Datepicker.MonthDayPicker min="09/20" max="12/10" position="auto" onChange={this.onChange} />
                    <span style={{paddingLeft: 20}}>可编辑</span>：<Datepicker.MonthDayPicker canEdit={true} min="01/20" position="auto" onChange={this.onChange} />
                </div>
                )
	}
}
export default DatepickerDemo;
```
