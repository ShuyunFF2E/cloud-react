---
order: 4
title: 基本的表单
desc: 标签描述和控件在一条水平线上
---

```javascript
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, Select, Field } from 'cloud-react';

export default function FormHorizontalDemo() {
	new Field(this);
	const [err, setErr] = useState(false);
	const onClick = () => setErr(true);

	return (
		<Form layout="horizontal" labelCol={{ span: 6 }}>
			<Form.Item label="用户名">
				<Input placeholder="请输入用户名" />
			</Form.Item>

			<Form.Item label="密码" required>
				<Input type="password" placeholder="请输入密码" />
			</Form.Item>

			<Form.Item label="所在国家" required>
				<Select defaultValue={1}>
					<Select.Option value={1}>中国大陆</Select.Option>
					<Select.Option value={2}>美国</Select.Option>
					<Select.Option value={3}>日本</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item label="备注333">
				<div>
					<Input.Textarea autoSize minRows={2} placeholder="备注信息..." />
					{err && <Input placeholder="xaaaaaa" />}
				</div>
			</Form.Item>

			<Form.Item label="性别" required>
				<Radio.Group>
					<Radio value={1}>保密</Radio>
					<Radio value={2}>先生</Radio>
					<Radio value={3}>女士</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item label="所属平台" required>
				<Checkbox.Group>
					<Checkbox value={1}>淘宝</Checkbox>
					<Checkbox value={2}>京东</Checkbox>
					<Checkbox value={3}>苏宁</Checkbox>
					<Checkbox value={4}>蘑菇街</Checkbox>
				</Checkbox.Group>
			</Form.Item>

			<Form.Item label="备注">
				<Input.Textarea maxLength={10} hasCounter autoSize minRows={2} placeholder="备注信息..." />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 6 }}>
				<Button type="primary" style={{ marginRight: 10 }} onClick={onClick}>
					提交
				</Button>
				<Button>重置</Button>
			</Form.Item>
		</Form>
	);
}
```
