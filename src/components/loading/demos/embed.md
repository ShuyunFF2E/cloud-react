---
order: 5
title: 卡片加载中
desc: 可以直接把内容内嵌到 Loading 中，将现有容器变为加载状态。
---

```jsx

            /**
             * title: 卡片加载中及背景
             * desc: 可以直接把内容内嵌到 Loading 中，将现有容器变为加载状态；
             *       默认无背景，layer = true 时有背景，为白色透明。
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
			<section>
				Loading state: <Toggle checked={this.state.loading} onChange={this.handleChange} />
				<Loading layer loading={this.state.loading} tip="Loading加载提示">
					<div className="test">
						<h2>直接把内容内嵌到 Loading 中，将现有容器变为加载状态。</h2>
						<div>自动撑开</div>
						<div>自动撑开</div>
						<div>自动撑开</div>
					</div>
				</Loading>
			</section>
		);
	}
}
```

