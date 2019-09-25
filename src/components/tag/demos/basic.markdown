---
order: 1
title: 基本使用
desc: 不显示帮助文本，只配置我们需要显示的文本
---

````javascript
import React from 'react';
import Tag from 'cloud-react/tag';


export default class TagDemo extends React.Component {

    constructor(props) {
        super(props);
		}
		
		closeTag(){
			console.log('close Tag trigger');
		}

	render() {
		return (
						<>
								<Tag>Tag1</Tag>
								<Tag><a href="http://www.baidu.com">Link</a></Tag>
								<Tag closable onClose={this.closeTag}>Tag need close</Tag>
						</>
		);
	}
}
````
