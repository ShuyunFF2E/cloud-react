---
order: 1
title: 按钮颜色类型
desc: 按钮三种颜色类型：tips（提示按钮）、danger（危险按钮）、success（成功按钮）
---

```jsx

            /**
             * title: 按钮颜色类型
             * desc: 按钮三种颜色类型：tips（提示按钮）、danger（危险按钮）、success（成功按钮）
             */
import React from 'react';
import { Button, InputNumber } from 'cloud-react';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div>
					<Button type="primary" colorType="tips">primary-tips</Button>
					{blank}
					<Button type="normal" colorType="tips">normal-tips</Button>
					{blank}
					<Button type="link" colorType="tips" >link-tips</Button>
					{blank}
					<Button type="text" colorType="tips" >text-tips</Button>
					<div style={{ marginTop:10 }}/>
					<Button type="primary" colorType="danger">primary-danger</Button>
					{blank}
					<Button type="normal" colorType="danger">normal-danger</Button>
					{blank}
					<Button type="link" colorType="danger">link-danger</Button>
					{blank}
					<Button type="text" colorType="danger">text-danger</Button>
					<div style={{ marginTop:10 }}/>
					<Button type="primary" colorType="success">primary-success</Button>
					{blank}
					<Button type="normal" colorType="success">normal-success</Button>
					{blank}
					<Button type="link" colorType="success">link-success</Button>
					{blank}
					<Button type="text" colorType="success">text-success</Button>
				</div>
			</React.Fragment>
		);
	}
}
```
