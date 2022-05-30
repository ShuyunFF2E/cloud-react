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
			setTimeout(() => {
				this.setState({ loading: false })
			}, 3000);
		});
	};

	render() {
		const { loading } = this.state;
		const text = loading ? '加载中…' : '点击后变为加载中';
		return (
			<ul>
				<li style={{ marginBottom: 10 }}>
					<h5>主要：</h5>
					<Button type="primary" loading={this.state.loading} onClick={this.handlerCLick}>
						{text}
					</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>普通：</h5>
					<Button loading={this.state.loading} onClick={this.handlerCLick}>
						{text}
					</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>幽灵：</h5>
					<Button type="dashed" loading={this.state.loading} onClick={this.handlerCLick}>
						{text}
					</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>链接：</h5>
					<Button type="link" loading={this.state.loading} onClick={this.handlerCLick}>
						{text}
					</Button>
				</li>
				<li style={{ marginBottom: 10 }}>
					<h5>文字：</h5>
					<Button type="text" loading={this.state.loading} onClick={this.handlerCLick}>
						{text}
					</Button>
				</li>
			</ul>
		);
	}
}
```
