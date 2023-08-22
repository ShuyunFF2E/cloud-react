---
order: 6
title: 加载状态
desc: 按钮点击添加加载中状态
---

```jsx
/**
 * title: 加载状态
 * desc: 按钮点击添加加载中状态
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
			setTimeout(() => {
				this.setState({ loading: false });
			}, 5000);
		});
	};

	handlerCompactCLick = async () => {
		await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 5000);
		})
	};

	render() {
		const { loading } = this.state;
		const text = loading ? '加载中…' : '点击后变为加载中';
		return (
			<ul>
				<li style={{ marginBottom: 10 }}>
					<h5>异步方法回调：</h5>
					<Button style={{ marginRight: 5 }} onClick={this.handlerCompactCLick}>请点击</Button>
					<Button.Group>
						<Button onClick={this.handlerCompactCLick}>上一页</Button>
						<Button onClick={this.handlerCompactCLick}>下一页</Button>
					</Button.Group>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>普通：</h5>
					<Button style={{ marginRight: 5 }} loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>主要：</h5>
					<Button style={{ marginRight: 5 }} type="primary" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="primary" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>次要：</h5>
					<Button style={{ marginRight: 5 }} type="secondary" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="secondary" colorType="tips" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="secondary" colorType="danger" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
					<Button style={{ marginRight: 5 }} type="secondary" colorType="success" loading={this.state.loading} onClick={this.handlerCLick}>{text}</Button>
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
