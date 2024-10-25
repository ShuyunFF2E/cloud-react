---
order: 9
title: 搜索框
desc: 带有搜索按钮的输入框。 搜索时，展示loading。
---

```jsx

/**
 * title: 搜索框
 * desc: 带有搜索按钮的输入框。搜索时，展示loading。
 */
import React, { useState } from 'react';
import { Input, Icon } from 'cloud-react';
import './styles/mix.less'

export default function InputDemo() {
    const placeholder = '请输入关键字搜索';
    const suffixIcon = <Icon className='input-prefix-icon' type="search" />;
    const [ value, setValue ] = useState('已输入的内容'); 
	return (
		<div className="input-demo-search-box">
			<Input suffix={suffixIcon} placeholder={placeholder} />
            <Input suffix={suffixIcon}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                hasClear />
            <Input suffix={suffixIcon} placeholder={placeholder} disabled/>
            <Input suffix={suffixIcon} placeholder={placeholder} loading/>
		</div>
	);
}
```
