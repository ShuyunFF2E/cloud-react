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
				<Input size="large" hasClear prefix={<Icon className='input-prefix-icon' type="rmb" />} addonBefore={<span>http://</span>} addonAfter=".com" />
				<Input hasClear size="default" addonBefore={<span>http://</span>} addonAfter=".com" />
				<Input hasClear size="small" addonBefore={<span>http://</span>} addonAfter=".com" />
			</div>
      <br />
			<div className="input-demo-box">
				<Input hasClear size="large" prefix={<Icon className='input-prefix-icon' type="rmb" />} /><br />
				<Input suffix={<Icon className='input-prefix-icon' type="search" />} /><br />
				<Input prefix={<Icon className='input-prefix-icon' type="rmb" />} suffix="RMB" />
			</div>
		</div>
	);
}
```
