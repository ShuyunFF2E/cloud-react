---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx

            /**
             * title: 徽标
             * desc: 支持 message 和 number 两种展示形式
             */
import React from 'react';
import { Badge } from 'cloud-react';

export default class BadgeDemos extends React.Component {
    onClick = () => {
        console.log('lalala');
    }
 
    render() {
        const { onClick } = this;
		return (
			<React.Fragment>
                <h4>message 模式</h4>
                <Badge mode="message" onClick={onClick} style={{ marginRight: 10 }}/>
                <Badge mode="message" type="success" onClick={onClick} style={{ marginRight: 10 }}/>
                <Badge mode="message" type="warn" onClick={onClick} style={{ marginRight: 10 }}/>
                <Badge mode="message" type="fail" onClick={onClick}/>
                <h4>number 模式</h4>
                <Badge mode="number" number={6} style={{ marginRight: 10 }}/>
                <Badge mode="number" number={66} type="success" onClick={onClick} style={{ marginRight: 10 }}/>
                <Badge mode="number" number={66} type="warn" onClick={onClick} style={{ marginRight: 10 }}/>
                <Badge mode="number" number={66} type="fail" onClick={onClick}/>
            </React.Fragment>
		);
	}
}
```

