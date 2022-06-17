---
order: 2
title: 输入框大小
desc: 三种尺寸：large、default、small
---

```jsx

            /**
             * title: 输入框大小
             * desc: 三种尺寸：large、default、small
             */
import React from 'react';
import { Input } from 'cloud-react';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input size="large" placeholder="size: large input" />
			<br />
			<Input size="default" placeholder="size: default input" />
			<br />
			<Input size="small" placeholder="size: small input" />
		</div>
	);
}
```
