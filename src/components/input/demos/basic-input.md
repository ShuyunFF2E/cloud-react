---
order: 1
title: 输入框
desc: 最基本的一个输入框
---

```jsx

/**
 * title: 输入框
 * desc: 最基本的一个输入框
 */
import React from 'react';
import { Input } from 'cloud-react';
import './styles/basic.less'

export default function InputDemo() {
	return <Input hasClear placeholder="请输入" />;
}
```
