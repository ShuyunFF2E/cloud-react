---
order: 5
title: Checkbox
desc: 复杂样式
---

```javascript
import React, { useState } from 'react';
import { Checkbox } from 'cloud-react';

export default function CheckboxDemo() {
	return (
		<div>
            <Checkbox style={{ height: 24 }}>
                <img width="24" height="24" style={{ marginRight: 8 }} src="https://img2.baidu.com/it/u=1429175118,2649084526&fm=26&fmt=auto" />
                <span>头像 + 文本</span>
            </Checkbox>
			<br />
            <br />
            <Checkbox
                style={{ height: 'auto' }} 
                textStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
                checkboxStyle={{ alignSelf: 'flex-start' }}>
                <p style={{ color: '#000000', marginBottom: 4 }}>我是标题</p>
                <p>我是文本我是文本</p>
            </Checkbox>
			<br />
            <br />
			<Checkbox style={{ height: 48 }} defaultChecked>
                <img width="48" height="48" style={{ marginRight: 8 }} src="https://img2.baidu.com/it/u=1429175118,2649084526&fm=26&fmt=auto" />
                <div>
                    <p style={{ color: '#000000', marginBottom: 4 }}>我是标题</p>
                    <p>我是文本我是文本</p>
                </div>
			</Checkbox>
		</div>
	);
}
```
