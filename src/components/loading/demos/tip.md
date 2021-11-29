---
order: 4
title: 自定义描述文案
desc: ''
---

```jsx

            /**
             * title: 自定义描述文案
             * desc: 
             */
import React from 'react';
import { Loading } from 'cloud-react';

export default class LoadingDemo extends React.Component {
	render() {
		return <Loading tip="Loading加载提示" />;
	}
}
```
