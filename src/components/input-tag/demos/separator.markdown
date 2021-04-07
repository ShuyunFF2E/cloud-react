---
order: 2
title: 指定分隔符
desc:  是否需要配置分隔符，按回车的时候以分隔符切割
---

```javascript
import React from 'react';
import { InputTag, Select } from 'cloud-react';

export default class InputTagDemo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
		};
	}

	handleChange = value => {
		console.log(value);
	};

	render() {
		const { data } = this.state;

		return <InputTag data={data} max={2} isConfigSeparator onChange={this.handleChange} />;
	}
}
```
