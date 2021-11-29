---
order: 5
title: Radio
desc: 复杂业务场景嵌套使用
---

```jsx
import React from 'react';
import { Radio } from 'cloud-react';

export default class NestingRadio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parentValue: 1,
			childValue: 1
		};
	}

	onParentChange = value => {
		this.setState({
			parentValue: value
		});
		console.log(value, 'parentValue');
	};

	onChildChange = value => {
		this.setState({
			childValue: value
		});
		console.log(value, 'childValue');
	};

	render() {
		return (
			<div>
				<Radio
					value={1}
					checked={true}
					style={{ height: 'auto' }}
					textStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
					radioStyle={{ alignSelf: 'flex-start' }}>
					<p style={{ color: '#000000', marginBottom: 4 }}>我是标题</p>
					<p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>我是文本我是文本</p>
				</Radio>
				<br />
				<br />
				<Radio value={2} style={{ height: 'auto' }} >
					<img width="24" height="24" style={{ marginRight: 8 }} src="https://img2.baidu.com/it/u=1429175118,2649084526&fm=26&fmt=auto" />
					<span>头像 + 文本</span>
				</Radio>
				<br />
				<br />
				<Radio value={3} checked={true}>
					<img width="48" height="48" style={{ marginRight: 8 }} src="https://img2.baidu.com/it/u=1429175118,2649084526&fm=26&fmt=auto" />
					<div>
						<p style={{ color: '#000', marginBottom: 4 }}>我是标题</p>
						<p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>我是文本我是文本</p>
					</div>
				</Radio>
			</div>
		);
	}
}
```