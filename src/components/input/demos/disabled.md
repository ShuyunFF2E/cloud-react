---
order: 7
title: 禁用输入框
desc: 添加 disabled 属性即可让输入框处于不可用状态，同时输入框样式也会改变。
---

```jsx

/**
 * title: 禁用输入框
 * desc: 添加 disabled 属性即可让输入框处于不可用状态，同时输入框样式也会改变。
 */
import React from 'react';
import { Input } from 'cloud-react';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input size="large" hasClear value="已输入禁用状态" disabled />
			<br />
			<Input disabled placeholder="未输入禁用状态" />
			<br />
			<Input.Textarea disabled placeholder="未输入禁用状态" rows={4} />
		</div>
	);
}
```
