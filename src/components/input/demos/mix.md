---
order: 3
title: 复合型输入框
desc: 可前置或后置元素，一般为标签或按钮
---

```jsx

/**
 * title: 复合型输入框
 * desc: 可前置或后置元素，一般为标签或按钮
 */
import React from 'react';
import { Input, Icon } from 'cloud-react';
import './styles/mix.less'

export default function InputDemo() {
	return (
		<div className="input-demo-mix-box">
			<div className="input-demo-box">
				<Input size="large" hasClear addonBefore={<span>http://</span>} addonAfter=".com" placeholder="请输入" />
				<Input hasClear size="default" addonBefore={<span>http://</span>} addonAfter=".com" placeholder="请输入" />
			</div>
      <br />
			<div className="input-demo-box">
				<Input suffix={<Icon className='input-prefix-icon' type="search" />} placeholder="请输入" /><br />
				<Input prefix={<Icon className='input-prefix-icon' type="people" />} placeholder="请输入" suffix="RMB" />
			</div>
		</div>
	);
}
```
