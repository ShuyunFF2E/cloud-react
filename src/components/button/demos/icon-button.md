---
order: 1
title: 按钮文字前添加图标
desc: 可选值为该组件库内所有Icon图标对应的字符：remark、config、view等等
---

```jsx

            /**
             * title: 按钮文字前添加图标
             * desc: 可选值为该组件库内所有Icon图标对应的字符：remark、config、view等等
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button type="primary" colorType="tips" icon="remark">primary</Button>
					{blank}
					<Button type="normal" colorType="tips" icon="hide">normal</Button>
					{blank}
					<Button type="link" colorType="tips" icon="calendar">link</Button>
					<div style={{ marginTop:10 }}/>
					<Button type="primary" colorType="danger" icon="plus-solid">primary</Button>
					{blank}
					<Button type="normal" colorType="danger" icon="upload">normal</Button>
					{blank}
					<Button type="link" colorType="danger" icon="people">link</Button>
					<div style={{ marginTop:10 }}/>
					<Button type="primary" colorType="success" icon="search-file">primary</Button>
					{blank}
					<Button type="normal" colorType="success" icon="move-up-solid">normal</Button>
					{blank}
					<Button type="link" colorType="success" icon="double-right">link</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
