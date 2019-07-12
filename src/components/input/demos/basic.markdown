---
order: 1
title: 输入框
desc: 最基本的一个输入框
---

````javascript
import React from 'react';
import Input from 'ccms-components-react/input';

export default function InputDemo() {
	return <Input placeholder="basic usage" />;
}
````

```less
.input-demo-box {
	> * {
		&:not(:last-child) {
			margin-bottom: 20px;
		}
		width: 250px;
	}

	textarea {
		width: 100%;
	}
}
```
