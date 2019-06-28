---
order: 5
title: 卡片加载中
desc: 可以直接把内容内嵌到 Loading 中，将现有容器变为加载状态。
---

````javascript
import React from 'react';
import Loading from 'ccms-components-react/loading';
import Toggle from 'ccms-components-react/toggle';

export default class LoadingDemo extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loading: false
    	}
	}
     
	handleChange = (loading) => {
		this.setState({ loading });
	}
        	
	render() {
		return (
			<section>
				Loading state: <Toggle checked={this.state.loading} onChange={this.handleChange} />
				
				<Loading layer loading={this.state.loading}>
					<div>
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
````


