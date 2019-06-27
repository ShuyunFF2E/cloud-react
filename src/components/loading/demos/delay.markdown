---
order: 5
title: 延迟加载
desc: 延迟显示加载效果的时间（防止闪烁），number (毫秒)
---

````javascript
import React from 'react';
import Loading from 'ccms-components-react/loading';
import Button from 'ccms-components-react/button';

export default class LoadingDemo extends React.Component {
	
	constructor(props) {
    		super(props);
    		this.state = {
    			loading: false
    		}
    	}
	
	delayLoading = () => {
		const {loading} = this.state;
		this.setState({
			loading: !loading
		})
	}

	render() {
		const {loading} = this.state;
		return (
			<div>
				<Button size="small" type="primary" onClick={this.delayLoading}>{loading ? '关闭延迟加载Loading' : '打开延迟加载Loading(1.5s)'}</Button>
				{loading && <Loading delay={1500}/>}
			</div>
			
		);
	}
}

````


