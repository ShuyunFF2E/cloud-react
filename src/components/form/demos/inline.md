---
order: 3
title: 平铺
desc: 所有表单项平铺在一起
---

```jsx

            /**
             * title: 平铺
             * desc: 所有表单项平铺在一起
             */
import React, { useState } from 'react';
import { Form, Field, Input, Button } from 'cloud-react';

class FormInlineDemo extends React.Component {
	field = new Field(this);

	onSubmit(evt) {
		evt.preventDefault();

		this.field.validate((errs, values) => {
			console.log(errs, values);
		});
	}

	onReset() {
		this.field.reset();
	}

	render() {
		const { init } = this.field;

		return (
			<Form layout="inline" field={this.field} onSubmit={this.onSubmit.bind(this)}>
				<Form.Item label="用户名">
					<Input
						placeholder="请输入用户名"
						{...init('userName', {
							rules: [{ required: true, message: '用户名不允许为空' }]
						})}
					/>
				</Form.Item>

				<Form.Item label="密码">
					<Input
						placeholder="请输入验证邮箱"
						{...init('email', {
							rules: [
								{ required: true, message: '验证邮箱不允许为空' },
								{ pattern: /^\w+@[a-z]{2,10}\.[a-z]{2,8}$/, message: '邮箱格式不正确' }
							]
						})}
					/>
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit" type="primary" style={{ marginRight: 10 }}>
						提交
					</Button>
					<Button onClick={this.onReset.bind(this)}>重置</Button>
				</Form.Item>
			</Form>
		);
	}
}
export default FormInlineDemo
```
