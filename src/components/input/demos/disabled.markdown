---
order: 7
title: 禁用输入框
desc: 添加 disabled 属性即可让输入框处于不可用状态，同时输入框样式也会改变。
---

```javascript
import React from 'react';
import { Input } from 'cloud-react';

const blank = '\u00A0';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input size="large" hasClear value="123" disabled placeholder="disabled input" />
			{blank}
			<Input disabled placeholder="disabled input" />
			{blank}
			<Input size="small" disabled placeholder="disabled input" />
			<br />
			<Input.Textarea disabled placeholder="disabled textarea" rows={4} />
		</div>
	);
}
```
