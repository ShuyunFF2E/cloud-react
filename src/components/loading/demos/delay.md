---
order: 6
title: 延迟加载
desc: 延迟显示加载效果的时间（防止闪烁），number (毫秒)
---

```jsx

            /**
             * title: 延迟加载
             * desc: 延迟显示加载效果的时间（防止闪烁），number (毫秒)
             */
import React from 'react';
import { Loading, Toggle } from 'cloud-react';

export default class LoadingDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	handleChange = loading => {
		this.setState({ loading });
	};

	render() {
		return (
			<div>
				Loading state(延迟1.5s): <Toggle checked={this.state.loading} onChange={this.handleChange} />
				<Loading layer delay={1500} loading={this.state.loading}>
					<h2>延迟加载 loading 效果。当 loading 状态在 delay 时间内结束，则不显示 loading 状态。</h2>
					<div>延迟加载</div>
					<div>延迟加载</div>
					<div>延迟加载</div>
				</Loading>
			</div>
		);
	}
}
```

