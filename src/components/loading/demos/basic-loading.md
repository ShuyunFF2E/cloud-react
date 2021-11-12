---
order: 1
title: 基本用法
desc: 一个简单的 loading 状态。
---

```jsx

            /**
             * title: 基本用法
             * desc: 一个简单的 loading 状态。
             */
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
			<React.Fragment>
				Loading state: <Toggle checked={this.state.loading} onChange={this.handleChange} />
				<div className="item-base">
					<Loading className="loadingClass" loading={this.state.loading} />
				</div>
			</React.Fragment>
		);
	}
}
```

