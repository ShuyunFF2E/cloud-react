---
title: 外部控制触发
desc: 手动触发tooltip。
---

```javascript
import React from 'react';
import { Button, Tooltip } from 'cloud-react';

export default class ToolTipDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '失败原因：</br>1.缺少微信/淘宝/线下平台账号</br> 2.其他',
			show: true
		};
	}

	onChangeStatus = e => {
		this.setState({ show: !this.state.show });
	};

	render() {
		const { content, show } = this.state;
		const style = { marginRight: '10px' };
		return (
			<div id="wrap" className="wrapClass">
				<Button style={style} onClick={this.onChangeStatus.bind(this)}>
					{show ? 'close' : 'show'} tooltip
				</Button>
				<Tooltip content={content} placement="top" visible={show} container={() => document.getElementById('wrap')}>
					<span>Click button {show ? 'close' : 'show'} toolTip.</span>
				</Tooltip>
			</div>
		);
	}
}
```
