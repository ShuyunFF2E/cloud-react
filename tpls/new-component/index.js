import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.less';

const prefix = 'newComponent';

export default class newComponent extends Component {
	static propTypes = {
		text: PropTypes.string,
		isShowHelp: PropTypes.bool
	};

	static defaultProps = {
		text: '把大象放进冰箱里面需要几步？',
		isShowHelp: false
	};

	state = {
		message: '3步：开冰箱，把大象放进去，关上冰箱😊'
	};

	constructor(props) {
		super(props);
		console.log(props);
	}

	componentDidMount() {
		// 组件挂载的时候做一些事情，比如获取dom，注册事件等等
		console.log('component did mount do someting');
	}

	componentWillUnmount() {
		// 组件卸载的时候做一些事情，比如注销事件，清除定时器等等
		console.log('component will mount do someting');
	}

	render() {
		const { message } = this.state;
		const { text, isShowHelp } = this.props;

		return (
			<div className={`${prefix}`}>
				<span className={`${prefix}-text`}>{text}</span>
				{isShowHelp && <p style={{ color: 'gray' }}>{message}</p>}
			</div>
		);
	}
}
