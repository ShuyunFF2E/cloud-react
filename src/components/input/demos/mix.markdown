---
order: 3
title: 复合型输入框
desc: 可前置或后置元素，一般为标签或按钮
---

````javascript
import React from 'react';
import Input from 'cloud-react/input';
import Icon from 'cloud-react/icon';

export default function InputDemo() {
	return (
		<div className="input-demo-mix-box">
			<div className="input-demo-box">
				<Input
					size="large"
					addonBefore={<span>http://</span>}
					addonAfter=".com" />
				<Input
					hasClear
					size="default"
					addonBefore={<span>http://</span>}
					addonAfter=".com" />
				<Input
					hasClear
					size="small"
					addonBefore={<span>http://</span>}
					addonAfter=".com" />
			</div>

			<div className="input-demo-box">
				<Input hasClear size="large" prefix={<Icon type="shop" />} />
				<Input suffix={<Icon type="search" />} />
				<Input prefix={<Icon type="shop" />} suffix={<Icon type="info" />} />
			</div>
		</div>
	);
}
````

````less
.input-demo-mix-box {
	display: flex;

	.input-demo-box {
		width: 50%;
		padding: 0 10px;
		box-sizing: border-box;

		> * {
			width: 100%;
		}
	}
}
````
