---
order: 1
title: 状态标签
desc: 用带颜色的标签来区分不同的状态展现
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
								<Tag type="success"> 启动 </Tag>
								<Tag type="warning"> 进行中 </Tag>
								<Tag type="defaut"> 禁用 </Tag>
								<Tag type="danger"> 错误 </Tag>
						</>
		);
	}
}
````
