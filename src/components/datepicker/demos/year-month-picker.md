---
order: 2
title: 年/月选择器
desc: 基本用法，年/月选择器。
---

```jsx

            /**
             * title: 年/月选择器
             * desc: 基本用法，年/月选择器。
             */
import React from 'react';
import { Datepicker } from 'cloud-react';

class DatePickerDemo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			value: '2021/01',
		};
	}
    onChange = value => console.log('年月--', value);



	render() {
	return (
                <div>
                    不可编辑：<Datepicker.YearMonthPicker position="auto" onChange={this.onChange} min="2018/12" max="2022/04"/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                    <Datepicker.YearMonthPicker value={this.state.value} canEdit={true} position="auto"  max="2022/04" onChange={this.onChange} format={'yyyy-mm'}/>
                </div>
                )
	}
}
export default DatePickerDemo
```
