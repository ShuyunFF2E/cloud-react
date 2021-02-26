---
order: 1
title: 基本使用
desc: 给定指定数据显示
---

```javascript
import React from 'react';
import { InputTag } from 'cloud-react';

export default class InputTagDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: ['abc']
		};
	}

	handleChange = value => {
		console.log(value);
	}

	render() {
		return <InputTag data={this.state.data} onChange={this.handleChange} />;
	}
}
```
