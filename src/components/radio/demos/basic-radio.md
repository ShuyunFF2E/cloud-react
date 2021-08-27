---
order: 1
title: Radio
desc: 单选按钮
---

```jsx

            /**
             * title: Radio
             * desc: 单选按钮
             */
import React from 'react';
import { Radio } from 'cloud-react';

export default function RadioDemo() {
	return (
		<Radio value={1} checked={true}>
			A
		</Radio>
	);
}
```
