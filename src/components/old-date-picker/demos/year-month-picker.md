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
import { OldDatePicker } from 'cloud-react';

export default class OldDatePickerDemo extends React.Component {

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
                    不可编辑：<OldDatePicker.YearMonthPicker position="auto" onChange={this.onChange} min="2018/12" max="2022/04"/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                    <OldDatePicker.YearMonthPicker value={this.state.value} canEdit={true} position="auto"  max="2022/04" onChange={this.onChange} format={'yyyy-mm'}/>
                </div>
                )
	}
}
```
