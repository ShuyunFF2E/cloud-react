---
order: 2
title: 水平
desc: 标签描述和控件在一条水平线上
---

```jsx

            /**
             * title: 水平
             * desc: 标签描述和控件在一条水平线上
             */
import React, { useState } from 'react';
import { Form, Input, Button } from 'cloud-react';

export default function FormHorizontalDemo() {
	return (
		<Form layout="horizontal" labelCol={{ span: 6 }}>
			<Form.Item label="用户名">
				<div>固定名称</div>
			</Form.Item>

			<Form.Item label="密码" required>
				<Input style={{ width: '70%' }} type="password" placeholder="请输入密码" />
			</Form.Item>

			<Form.Item label="备注">
				<Input.Textarea style={{ width: '70%' }} autoSize minRows={2} placeholder="备注信息" />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 6 }}>
				<Button type="primary" style={{ marginRight: 10 }}>
					提交
				</Button>
				<Button>重置</Button>
			</Form.Item>
		</Form>
	);
}
```
