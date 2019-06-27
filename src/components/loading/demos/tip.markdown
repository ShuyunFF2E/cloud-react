---
order: 3
title: 自定义描述文案
desc: ''
---

````javascript
import React from 'react';
import Loading from 'ccms-components-react/loading';

export default class LoadingDemo extends React.Component {

	render() {
		return (
			<div className="item-tip">
				<Loading tip="Loading..."/>
			</div>
		);
	}
}

````
````less
.item-tip {
	 height: 80px;
}
````

