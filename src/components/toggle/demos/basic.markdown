---
order: 1
title: 基础用法
desc: checked 使用
---

```javascript
import React from 'react';
import { Toggle } from 'cloud-react';

export default class ToggleDemo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: true
		};
	}

	handleChange = checked => {
		this.setState({ checked });
	};

	render() {
		const { checked } = this.state;

		return (
			<div>
				<div>
					不添加checked状态：
					<Toggle />
				</div>

				<div className="item">
					设置checked为true：
					<Toggle checked={checked} onChange={this.handleChange} />
				</div>

				<div>
					设置开关的文案显示：
					<Toggle checked={checked} checkedText="这里是开" unCheckedText="这里是关" onChange={this.handleChange} />
				</div>
			</div>
		);
	}
}
```

```less
.item {
	margin: 0 10px;
}
```
