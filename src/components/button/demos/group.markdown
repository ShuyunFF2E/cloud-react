---
title: 按钮组合
desc: 通过 Button.Group 容器组件来包装 Button，可以统一设置 size, type
---

````javascript
import React from 'react';
import Button from 'ccms-components-react/button';

const blank = '\u00A0';

export default class ButtonDemo extends React.Component {
	render() {
		return (
			<>
				<div style={{ marginBottom: 20 }}>
					<Button.Group size="large" type="primary">
						<Button>left</Button>
						<Button>middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>

				<div style={{ marginBottom: 20 }}>
					<Button.Group>
						<Button>left</Button>
						<Button type="primary">middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>

				<div style={{ marginBottom: 20 }}>
					<Button.Group type="dashed">
						<Button>left</Button>
						<Button type="primary">middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>

				<div style={{ marginBottom: 20 }}>
					<Button.Group type="dashed" disabled>
						<Button>left</Button>
						<Button type="primary">middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>

				<div style={{ marginBottom: 20 }}>
					<Button.Group size="small">
						<Button>left</Button>
						<Button>middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>

				<div style={{ marginBottom: 20 }}>
					<Button.Group size="small" type="link">
						<Button>left</Button>
						<Button>middle</Button>
						<Button>right</Button>
					</Button.Group>
				</div>
			</>
		);
	}
}
````
