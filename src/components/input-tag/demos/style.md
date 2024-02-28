---
order: 3
title: 修改样式
desc: 配置容器的样式，单个tag的最大宽度，超过显示省略号
---

```jsx

            /**
             * title: 修改样式
             * desc: 配置容器的样式，单个tag的最大宽度，超过显示省略号
             */
import React from 'react';
import { InputTag } from 'cloud-react';

class InputTagDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: ["123", "456", "dd", "qqq", "今生今世解决世界上", "还是实话实说实话实说还是", "今生今世解决睡觉睡觉睡觉就睡觉睡觉睡觉觉就睡觉睡觉解决睡觉睡觉就睡觉睡觉", "123", 'abv']
		};
	}

	handleChange = value => {
		console.log(value);
	}

	render() {
		const { data } = this.state;
		return <InputTag data={data} onChange={this.handleChange} maxWidth={150} style={{ width: '300px', height: '200px' }} />;
	}
}
export default InputTagDemo
```
