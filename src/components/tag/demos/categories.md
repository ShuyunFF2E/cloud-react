---
order: 2
title: 可选择标签
desc: onClick使用
---

```jsx

            /**
             * title: 可选择标签
             * desc: onClick使用
             */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: [
				{ text: '游泳', checked: true },
				{ text: '冲浪', checked: true },
				{ text: '潜水', checked: false },
				{ text: '攀岩', checked: false, disabled: true },
				{ text: '空中瑜伽', checked: true, disabled: true }
			]
		};
	}

	handleClick = index => {
		const tagList = this.state.tags.map((item, _index) => {
			return {
				...item,
				checked: index === _index ? !item.checked : item.checked
			};
		});

		this.setState({
			tags: tagList
		});
	};

	render() {
		const { tags } = this.state;

		return (
			<>
				<label>时尚的运动：</label>
				{tags.map(({ checked, disabled, text }, index) => (
					<Tag key={index} checked={checked} disabled={disabled} onClick={() => this.handleClick(index)}>
						{text}
					</Tag>
				))}
			</>
		);
	}
}
```
