---
order: 8
title: 受控的输入框
desc: 受控的输入框
---

```javascript
import React, { Component } from 'react';
import { Input } from 'cloud-react';

export default class InputDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		setTimeout(() => {
			this.setState({
				value: '232'
			});
		}, 1000);
	}

	// 只允许输入英文、数字和汉字
	onChange = evt => {
		this.setState({
			value: evt.target.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '')
		});
	};

	render() {
		return <Input placeholder="basic usage" defaultValue={23} value={this.state.value} onChange={this.onChange} />;
	}
}
```
