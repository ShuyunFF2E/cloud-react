---
order: 1
title: 基本使用
desc: 给定指定数据显示
---

```jsx

            /**
             * title: 基本使用
             * desc: 给定指定数据显示
             */
import React from 'react';
import { InputTag } from 'cloud-react';

class InputTagDemo extends React.Component {
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
export default InputTagDemo
```
