---
order: 5
title: Radio.Group
desc: 复杂业务场景嵌套使用
---

```jsx

            /**
             * title: Radio.Group
             * desc: 复杂业务场景嵌套使用
             */
import React from 'react';
import { Radio } from 'cloud-react';

export default class NestingRadio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			parentValue: 1,
			childValue: 1
		};
	}

	onParentChange = value => {
		this.setState({
			parentValue: value
		});
		console.log(value, 'parentValue');
	};

	onChildChange = value => {
		this.setState({
			childValue: value
		});
		console.log(value, 'childValue');
	};

	render() {
		return (
			<Radio.Group value={this.state.parentValue} onChange={this.onParentChange} vertical>
				<div>
					<span>
						<Radio value={1}>AAAAAAAAA</Radio>
					</span>
				</div>
				<Radio value={2}>BBBBBBBBB</Radio>
				<Radio value={3}>cccccccc</Radio>
				<div>title</div>
				<Radio.Group value={this.state.childValue} onChange={this.onChildChange} vertical>
					<Radio value={1}>lalalala</Radio>
					<Radio value={2}>啊呜啊呜啊呜</Radio>
				</Radio.Group>
			</Radio.Group>
		);
	}
}
```
