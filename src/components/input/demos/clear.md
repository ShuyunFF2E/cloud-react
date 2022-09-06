---
order: 4
title: 一键清除
desc: 输入内容后可点击输入框后面的按钮一键清除内容
---

```jsx

/**
 * title: 一键清除
 * desc: 输入内容后可点击输入框后面的按钮一键清除内容
 */
import React from 'react';
import { Input, Icon } from 'cloud-react';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input hasClear size="default" placeholder="请输入" />
		</div>
	);
}
```
