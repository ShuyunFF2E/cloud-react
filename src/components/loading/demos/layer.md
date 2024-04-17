---
order: 3
title: 背景
desc: 默认无背景，layer = true 时，有背景。
---

```jsx

            /**
             * title: 背景
             * desc: 默认无背景，layer = true 时，有背景。
             */
import React from 'react';
import { Loading } from 'cloud-react';

class LoadingDemo extends React.Component {
	render() {
		return <Loading layer />;
	}
}
export default LoadingDemo
```
