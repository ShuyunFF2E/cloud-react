---
order: 6
title: 多行纯文本输入框
desc: 设置最小、最大行数或者直接由文本自适应， 固定行数
---

```javascript
import React from 'react';
import { Input, Icon } from 'cloud-react';

export default function InputDemo() {
	return (
		<div>
			<Input.Textarea placeholder="basic textarea" maxLength={10} hasCounter />
			<br />
			<Input.Textarea placeholder="rows: 4" rows={4} />
			<br />
			<Input.Textarea placeholder="autoSize" autoSize />
			<br />
			<Input.Textarea placeholder="autoSize & minRows: 2" autoSize minRows={2} />
			<br />
			<Input.Textarea placeholder="autoSize & minRows: 2 _ minRows: 4" autoSize minRows={2} maxRows={4} />
		</div>
	);
}
```
