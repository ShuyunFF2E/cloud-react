---
order: 6
title: loading状态控制
desc: 按钮点击添加loading
---

```jsx

            /**
             * title: loading状态控制
             * desc: 按钮点击添加loading
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}

	handlerCLick = () => {
		this.setState({ loading: true }, () => {
			// setTimeout(() => {
			// 	this.setState({ loading: false })
			// }, 3000);
		});
	};

	render() {
		const { loading } = this.state;
		const text = loading ? '加载中…' : '点击后变为加载中';
		return (
			<ul>
				<li style={{ marginBottom: 10 }}>
					<h5>主要：</h5>
					<Button style={{ marginRight: 5 }} type="primary" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>普通：</h5>
					<Button style={{ marginRight: 5 }} loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>幽灵：</h5>
					<Button style={{ marginRight: 5 }} type="dashed" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="dashed" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="dashed" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="dashed" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>链接：</h5>
					<Button style={{ marginRight: 5 }} type="link" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="link" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="link" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="link" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>文字：</h5>
					<Button style={{ marginRight: 5 }} type="text" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="text" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="text" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="text" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
			</ul>
		);
	}
}
```
