---
order: 4
title: 日期选择器
desc: 基本用法，日期选择器。
---

```jsx

            /**
             * title: 日期选择器
             * desc: 基本用法，日期选择器。
             */
import React from 'react';
import { OldDatePicker, Button } from 'cloud-react';

export default class OldDatePickerDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			value1: '',
            value: '1990/07/10',
            tValue1: '',
            tValue2: ''
		};
	}

	onChangeDate1 = date => {
        this.setState({value1: date});
		console.log('最终数值-------------', date);
	}
    onChangeDateT = data => {
		this.setState({tValue2: data});
		console.log('最终数值-------------', data);
	}

    reset = () => {
       this.setState({value1: '2020/07/10'})
	   console.log('重置');
    }

	render() {
		return (
			<div>
                <div>
                    不可编辑：<OldDatePicker isAppendToBody
                         				 value={this.state.value}
                         				 position="auto"/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                            <OldDatePicker isAppendToBody
                                        canEdit={true}
                                        minDate={'1990/3/1'}
                                        maxDate={new Date('2024/5/1')}
                         				value={this.state.value1}
                         				position="auto"
                         				onChange={this.onChangeDate1}/>
                <Button style={{marginLeft: 20}} onClick={this.reset}> 重置 </Button>
                </div>
				<br />
				<br />
                <div>
                    不可编辑：<OldDatePicker isAppendToBody
                         				 value={this.state.tValue1}
                                         showTimePicker
                         				 position="auto"/>
                    <span style={{paddingLeft: 20}}>可编辑</span>：
                            <OldDatePicker isAppendToBody
                                        canEdit={true}
                         				value={this.state.tValue2}
                         				position="auto"
                                        showTimePicker
                                        defaultTime="23:59:59"
                         				onChange={this.onChangeDateT}/>
                </div>

			</div>
		);
	}
}
```
