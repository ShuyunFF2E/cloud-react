---
order: 5
title: 计数器
desc: 统计当前输入字数
---

```jsx

            /**
             * title: 计数器
             * desc: 统计当前输入字数
             */
import React from 'react';
import { Input, Icon } from 'cloud-react';

export default function InputDemo() {
	return (
		<div className="input-demo-box">
			<Input hasCounter maxLength="20" size="default" placeholder="单独的计数器" />
			<br />
			<Input hasClear hasCounter maxLength="10" size="default" placeholder="计数器加清除" />
			<br />
			<Input hasCounter maxLength="10" hasClear size="default" addonBefore={<span>http://</span>} addonAfter=".com" placeholder="带图标" />
		</div>
	);
}
```
