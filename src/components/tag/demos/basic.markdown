---
order: 1
title: 基本使用
desc: 普通标签与link标签，可删除的标签
---

````javascript
import React from 'react';
import { Tag } from 'cloud-react';

export default class TagDemo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tagList: ['红色', '黄色', '蓝色']
		};
	}

	handleRemove = index => {

		const tags = this.state.tagList;
		tags.splice(index, 1);

		this.setState({
			tagList: tags
		});
	}

	render() {

		const { tagList } = this.state;

		return (
			<>
				<Tag>Tag Demo</Tag>
				<Tag><a href="http://www.baidu.com">Link Tag</a></Tag>
				<br/><br/><br/>
				<label>删除你不喜欢的颜色：</label>
				{
					tagList.map((item, index) => (
						<Tag closable onClose={() => this.handleRemove(index)} key={index}>{item}</Tag>
					))
				}
			</>
		);
	}
}
````
