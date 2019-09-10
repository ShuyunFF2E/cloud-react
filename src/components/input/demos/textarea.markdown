---
order: 5
title: 多行纯文本输入框
desc: 设置最小、最大行数或者直接由文本自适应， 固定行数
---

````javascript
import React from 'react';
import Input from 'cloud-react/input';
import Icon from 'cloud-react/icon';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input.Textarea placeholder="basic textarea" />
			<Input.Textarea placeholder="rows: 4" rows={4} />
			<Input.Textarea placeholder="autoSize" autoSize />
			<Input.Textarea placeholder="autoSize & minRows: 2" autoSize minRows={2} />
			<Input.Textarea placeholder="autoSize & minRows: 2 _ minRows: 4" autoSize minRows={2} maxRows={4} />
		</div>
	);
}
````
