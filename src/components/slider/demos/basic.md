---
order: 1
title: 滑动输入条
desc: 默认样式
---

```jsx

import React, { useState, useEffect } from 'react';
import { Slider } from 'cloud-react';

export default function Demo() {
  const [value, setValue] = useState(30);

	return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
				<Slider value={value} onChange={setValue} />
        <div>{value}%</div>
			</div>
		);
}
```
