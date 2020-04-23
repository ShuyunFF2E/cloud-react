---
order: 1
title: 基本用法
desc: 一个简单的 loading 状态。
---

```javascript
import React from 'react';
import { Loading, Toggle } from 'cloud-react';

export default class LoadingDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	handleChange = loading => {
		this.setState({ loading });
	};

	render() {
		return (
			<>
				Loading state: <Toggle checked={this.state.loading} onChange={this.handleChange} />
				<div className="item-base">
					<Loading loading={this.state.loading} />
				</div>
			</>
		);
	}
}
```

```less
.item-base {
	margin-top: 15px;
	width: 200px;
	height: 200px;
	background: black;
	opacity: 0.5;
}
```
