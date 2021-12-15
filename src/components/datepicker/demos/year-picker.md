---
order: 1
title: 年选择器
desc: 基本用法，年选择器。
---

```jsx

            /**
             * title: 年选择器
             * desc: 基本用法，年选择器。
             */
import React from 'react';
import { Datepicker } from 'cloud-react';

export default class DatepickerDemo extends React.Component {
	onInpChange = value => console.log(value);

	render() {
		return (
                <div>
                    不可编辑：<Datepicker.YearPicker min={2014} position="auto" max={2034} defaultValue={2020} onChange={this.onInpChange} />
                    <span style={{paddingLeft: 20}}>可编辑</span>：<Datepicker.YearPicker canEdit min={2014} position="auto" max={2034} defaultValue={2020} onChange={this.onInpChange} />
                </div>
                )
	}
}
```
