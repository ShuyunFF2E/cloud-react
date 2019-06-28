---
order: 1
title: Radio.Group
desc: 布局（horizontal|vertical）
---

````javascript
import React from 'react';
import Radio from 'ccms-components-react/radio';


export default function RadioDemo() {
	
	const style = { marginBottom: '10px' };
	
	return (
		<>
				<h2>horizontal</h2>
				<Radio.Group defaultValue={1} horizontal>
        			<Radio value={1}>A</Radio>
        			<Radio value={2}>B</Radio>
        			<Radio value={3}>C</Radio>
        		</Radio.Group>
        		<h2>vertical</h2>
				<Radio.Group defaultValue={1} vertical>
        			<Radio style={style} value={1}>AAAA</Radio>
        			<Radio style={style} value={2}>BBBB</Radio>
        			<Radio style={style} value={3}>CCCC</Radio>
        		</Radio.Group>
		</>
	)
}
````
