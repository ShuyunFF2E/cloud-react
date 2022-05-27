---
order: 1
title: 基本
desc: 数字输入框
---

```jsx

/**
 * title: 基本
 * desc: 数字输入框
 */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class InputNumberDemo extends React.Component {
	render() {
		return <InputNumber precision={0} max={365} placeholder="请输入" />;
	}
}
```
