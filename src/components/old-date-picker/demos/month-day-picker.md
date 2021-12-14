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
import { OldDatePicker } from 'cloud-react';

export default class OldDatePickerDemo extends React.Component {
	onChange = value => console.log(value);
	render() {
        return (
                <div>
                    不可编辑：<OldDatePicker.MonthDayPicker min="09/20" max="12/10" position="auto" onChange={this.onChange} />
                    <span style={{paddingLeft: 20}}>可编辑</span>：<OldDatePicker.MonthDayPicker canEdit={true} min="01/20" position="auto" onChange={this.onChange} />
                </div>
                )
	}
}
```
