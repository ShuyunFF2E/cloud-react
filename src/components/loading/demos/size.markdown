---
order: 2
title: 各种大小 size
desc: 小的用于文本加载，大的用于页面级加载。
---

````javascript
import React from 'react';
import Loading from 'ccms-components-react/loading';

export default class LoadingDemo extends React.Component {

	render() {
		return (
			<section className="item-size">
				<div>
					<Loading size="small"/>
				</div>
				<div>
					<Loading />
				</div>
			</section>
		);
	}
}

````
````less
.item-size {
	 display: flex;
	 justify-content: center;
	 >div {
	 width: 60px;
	 }
}
````
