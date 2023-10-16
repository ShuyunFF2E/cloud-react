---
order: 8
title: 受控的输入框
desc: 受控的输入框
---

```jsx

/**
 * title: 受控的输入框
 * desc: 受控的输入框
 */
import React, { Component } from 'react';
import { Button, Input } from 'cloud-react';

class InputDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			disabled: false
		};
		setTimeout(() => {
			this.setState({
				value: 232
			});
		}, 1000);
	}

	// 只允许输入英文、数字和汉字
	onChange = evt => {
		this.setState({
			value: evt.target.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
		});
	};

	onChangeDisabled = () => {
		const { disabled } = this.state;
		this.setState({
			disabled: !disabled
		});
	};

	render() {
		const { disabled, value } = this.state;
		return (
			<div>
				<Input
					placeholder="请输入"
					hasClear
					hasCounter
          useComposition
					maxLength={20}
					defaultValue={23}
					value={value}
					disabled={disabled}
					onChange={this.onChange}
				/>
				<Button type="primary" style={{ marginLeft: 15 }} onClick={this.onChangeDisabled}>
					{disabled ? '解除禁用' : '禁用'}
				</Button>
			</div>
		);
	}
}

export default InputDemo;
```
