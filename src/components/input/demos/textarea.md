---
order: 6
title: 多行纯文本输入框
desc: 设置最小、最大行数或者直接由文本自适应， 固定行数
---

```jsx

            /**
             * title: 多行纯文本输入框
             * desc: 设置最小、最大行数或者直接由文本自适应， 固定行数
             */
import React, { useState } from 'react';
import { Input, Button } from 'cloud-react';

export default function InputDemo() {
	const [value, setValue] = useState('');

	function onChange(evt) {
		setValue(evt.target.value);
	}

	function onSetTextArea() {
		setValue('1111\n2222\n3333\n4444\n5555');
	}

	function onResetTextArea() {
		setValue('');
	}

	return (
		<div>
			<Input.Textarea placeholder="basic textarea" style={{ width: 400 }} autoSize maxLength={10} hasCounter />
			<br />
			<Input.Textarea placeholder="rows: 4" rows={4} />
			<br />
			<Input.Textarea placeholder="autoSize & minRows: 2" autoSize minRows={2} />
			<br />
			<Input.Textarea placeholder="autoSize & minRows: 2 _ minRows: 4" autoSize minRows={2} maxRows={4} />
			<br />
			<Input.Textarea value={value} onChange={onChange} placeholder="autoSize" autoSize />
			<br />
			<Button onClick={onSetTextArea} type="primary" size="small">
				设置值
			</Button>
			<Button onClick={onResetTextArea} size="small" style={{ marginLeft: 10 }}>
				清空
			</Button>
		</div>
	);
}
```
