---
order: 3
title: 可删除的标签
desc: onClose使用
---

```jsx

            /**
             * title: 可删除的标签
             * desc: onClose使用
             */
import React, { Component } from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tagList: [
				{ text: '红色', checked: true, color: "red" },
				{ text: '蓝色', checked: false, color: "blue" },
				{ text: '黄色', checked: false, color: "yellow" }
			]
		};
	}

	handleRemove = index => {
		const tags = this.state.tagList;
		tags.splice(index, 1);

		this.setState({
			tagList: tags
		});
	};

	handleClick = index => {
		const tags = this.state.tagList.map((item, _index) => {
			return {
				...item,
				checked: index === _index ? !item.checked : item.checked
			};
		});

		this.setState({
			tagList: tags
		});
	};

	render() {
		const { tagList } = this.state;

		return (
			<React.Fragment>
				{tagList.map((item, index) => (
					<Tag key={index} closable color={item.color} onClose={() => this.handleRemove(index)} onClick={() => this.handleClick(index)}>
						{item.text}
					</Tag>
				))}
			</React.Fragment>
		);
	}
}
```
