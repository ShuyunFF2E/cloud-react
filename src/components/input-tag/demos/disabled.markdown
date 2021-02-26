---
order: 4
title: 只读状态
desc: 可以配置disabled属性为只读状态，不支持输入
---

```javascript
import React from 'react';
import { InputTag } from 'cloud-react';

export default class InputTagDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: ['abc', '这里是很长的一段文本，超过宽度会显示省略号']
		};
	}

	handleChange = value => {
		console.log(value);
	}

	render() {
		return <InputTag data={this.state.data} disabled onChange={this.handleChange} />;
	}
}
```
