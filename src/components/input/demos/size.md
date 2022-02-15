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

const blank = '\u00A0';

export default function InputDemo() {
	return (
		<div>
			<Input size="large" placeholder="size: large input" />
			{blank}
			<Input size="default" placeholder="size: default input" />
			{blank}
			<Input size="small" placeholder="size: small input" />
		</div>
	);
}
```
