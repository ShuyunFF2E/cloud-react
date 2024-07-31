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
		setValue('文本内容');
	}

	function onResetTextArea() {
		setValue('');
	}

	return (
		<div>
			<Input.Textarea placeholder="请输入文案，最多10个字符" style={{ width: 400 }} autoSize maxLength={10} hasCounter />
			<br />
			<Input.Textarea placeholder="请输入文案，高度最小3行，最大5行" rows={4} resize hasCounter maxLength={10}/>
			<br />
			<Input.Textarea placeholder="请输入文案，高度可自适应" minRows={2} resize/>
			<br />
      <div className="row-flex-center">
        <Input.Textarea value={value} onChange={onChange} placeholder="请输入文案" autoSize />
        <Button onClick={onSetTextArea} type="primary" size="small" style={{ marginLeft: 10 }}>
          设置值
        </Button>
        <Button onClick={onResetTextArea} size="small" style={{ marginLeft: 10 }}>
          清空
        </Button>
      </div>

		</div>
	);
}
```
