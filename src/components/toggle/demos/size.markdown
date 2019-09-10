---
order: 2
title: toggle 大小 size 使用
desc: 不配置size即为默认的 default 大小，设置size = samll 为小号toggle
---

````javascript
import React from 'react';
import Toggle from 'cloud-react/toggle';
import Button from 'cloud-react/button';

export default class ToggleSizeDemo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			checked: true,
			size: 'default'
		}
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	handleSize = (size) => {
		this.setState({ size })
	}

	render() {

		const { size, checked } = this.state;

		return (
			<div>
				当前size为<span className="hightlight">{size}</span>：
				<Toggle size={size} checked={checked} onChange={this.handleChange} />

				<Button size="small" type="normal" className="item" onClick={this.handleSize.bind(this, 'default')}>切换为default</Button>

				<Button size="small" type="primary" onClick={this.handleSize.bind(this, 'small')}>切换为small</Button>
			</div>
		);
	}
}

````

````less
.hightlight {
	color: red;
}
.item {
	margin: 0 10px;
}
```
