---
order: 7
title: 组件内外数据传输
desc: 在modal组件中进行数据传输
---

```jsx

            /**
             * title: 组件内外数据传输
             * desc: 在modal组件中进行数据传输
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';
import getQueryString from './query.js';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.showType = getQueryString('showType') || 'top';
		this.state = {
			visible: false,
			content: 'hello world, I come from outside'
		};
	}

	// 复杂演示
	openComplexModal = () => {
		this.setState({
			visible: true
		});
	};

	handleClick = () => {
		alert('hello，how are you ?');
	};

	handleOk = () => {
		this.setState({
			visible: false
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openComplexModal}>
					复杂演示
				</Button>
				<Modal 
					showType={this.showType}
					visible={this.state.visible}
					onOk={this.handleOk} 
					onClose={this.handleCancel} 
					onCancel={this.handleCancel}>
					this is a complex demo,you can click it
					<br />
					<br />
					<Button onClick={this.handleClick}>click me</Button>
					<br />
					<br />
					<Body content={this.state.content} defineEvent={this.handleClick} />
				</Modal>
			</div>
		);
	}
}

class Body extends React.Component {
	render() {
		const { content, defineEvent } = this.props;
		return (
			<div>
				<span>{content}</span>
				<br />
				<br />
				<Button type="primary" onClick={defineEvent}>
					click me（from outside）
				</Button>
			</div>
		);
	}
}
```
