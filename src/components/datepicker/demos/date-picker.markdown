---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```javascript
import React from 'react';
import { Datepicker, Button } from 'cloud-react';

export default class DatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			value1: '2020/07/10',
            value: '1990/07/10',
		};
	}

	onChangeDate1 = date => {
        this.setState({value1: date});
		console.log('最终数值-------------', date);
	}
    reseat = () => {
       this.setState({value1: '2020/07/10'})
	   console.log('重置');
    }


	render() {
		return (
			<div>
                <div>
                    不可编辑：<Datepicker isAppendToBody
                         				 value={this.state.value}
                         				 position="auto"/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                            <Datepicker isAppendToBody
                                        canEdit={true}
                                        minDate={'1990/3/1'}
                                        maxDate={new Date('2024/5/1')}
                         				value={this.state.value1}
                         				position="auto"
                         				onChange={this.onChangeDate1}/>
                <Button onClick={this.reseat}> 重置 </Button>
                </div>
				<br />
				<br />
			</div>
		);
	}
}
```
