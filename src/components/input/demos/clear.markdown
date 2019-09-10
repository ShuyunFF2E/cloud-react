---
order: 4
title: 一键清除
desc: 输入内容后可点击输入框后面的按钮一键清除内容
---

````javascript
import React from 'react';
import Input from 'cloud-react/input';
import Icon from 'cloud-react/icon';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input hasClear size="large" placeholder="try typing in something" />
			<br />
			<Input hasClear size="default" placeholder="try typing in something" />
			<br />
			<Input hasClear size="small" placeholder="try typing in something" />
		</div>
	);
}
````
