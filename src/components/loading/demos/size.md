---
order: 2
title: 各种大小
desc: 'size,默认default，可设置为small、large'
---

```jsx

            /**
             * title: 各种大小
             * desc: size,默认default，可设置为small、large
             */
import React from 'react';
import { Loading } from 'cloud-react';

class LoadingDemo extends React.Component {
	render() {
		return (
			<section className="item-size">
				<div>
					<Loading size="small" />
				</div>
				<div>
					<Loading />
				</div>
				<div>
					<Loading size="large" />
				</div>
			</section>
		);
	}
}
export default LoadingDemo
```

