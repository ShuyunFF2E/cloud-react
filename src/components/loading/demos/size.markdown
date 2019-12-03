---
order: 2
title: 各种大小
desc: size,默认default，可设置为small、large
---

````javascript
import React from 'react';
import { Loading } from 'cloud-react';

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
				<div>
                	<Loading  size="large"/>
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
