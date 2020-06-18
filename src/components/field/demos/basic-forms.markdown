---
order: 1
title: 基本使用
desc: 常用控件的校验方式
---

```javascript
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, Select, Toggle, Field, InputNumber, Datepicker } from 'cloud-react';

export default class FormHorizontalDemo extends React.Component {
	field = new Field(this, {
		onChange: (field, value, values) => {
			console.log(field, value, values);
		}
	});

	state = {
		emailCheckable: true
	};

	onValidate() {
		console.log(this.field.getErrors(['test', 'test1', 'email', 'number', 'address']), '--getErrors使用');
		this.field.validate((errs, values) => {
			console.log(errs, values);
		});
	}

	onReset() {
		this.field.reset();
	}

	getValues() {
		console.log(this.field.getValues());
	}

	onClear() {
		this.field.clear();
	}

	onChange = emailCheckable => {
		this.setState({ emailCheckable });
	};

	render() {
		const { init } = this.field;
		const { emailCheckable } = this.state;

		return (
			<>
				<Form layout="horizontal" labelCol={{ span: 6 }} field={this.field}>
					<Form.Item label="是否开启邮箱校验">
						<Radio.Group value={emailCheckable} onChange={this.onChange}>
							<Radio value={true}>开启</Radio>
							<Radio value={false}>禁用</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item label="用户名" help="使用了Form.Nexus组件，可以查看示例代码">
						<User field={this.field} />
					</Form.Item>

					<Form.Item label="时间">
						<Datepicker
							{...init('test', {
								rules: [{ required: true, message: '请输入时间' }]
							})}
							maxDate={new Date('2024/5/1')}
							showTimePicker={true}
							placeholder="年月日 时分秒"
						/>
					</Form.Item>

					<Form.Item label="时间区间">
						<Datepicker.RangePicker
							{...init('test1', {
								rules: [{ required: true, message: '请输入时间区间' }]
							})}
							minDate={new Date('2020/03/03')}
							maxDate={new Date('2020/10/23')}
						/>
					</Form.Item>

					<Form.Item label="邮箱">
						<Input
							placeholder="请输入验证邮箱"
							{...init('email', {
								checkable: emailCheckable,
								rules: [
									{ required: true, message: '验证邮箱不能为空' },
									{ pattern: /^\w+@[a-z]{2,10}\.[a-z]{2,8}$/, message: '邮箱格式不正确' }
								]
							})}
						/>
					</Form.Item>

					<Form.Item label="中奖次数">
						<InputNumber
							placeholder="请输入中奖次数"
							{...init('number', {
								rules: [{ required: true, message: '中奖次数不能为空' }, { min: 5 }, { max: 10 }]
							})}
						/>
					</Form.Item>

					<Form.Item label="所在国家" required>
						<Select
							{...init('address', {
								rules: [{ required: true, message: '所属地区不能为空' }]
							})}>
							<Select.Option value={1}>中国大陆</Select.Option>
							<Select.Option value={2}>美国</Select.Option>
							<Select.Option value={3}>日本</Select.Option>
						</Select>
					</Form.Item>

					<Form.Item label="是否开启" required>
						<Toggle
							checkedText="这里是开"
							unCheckedText="这里是关"
							{...init('toggle', {
								valueName: 'checked',
								rules: [{ required: true, message: '值不能为空' }]
							})}
						/>
					</Form.Item>

					<Form.Item label="性别" required>
						<Radio.Group
							{...init('gender', {
								rules: [{ required: true, message: '性别不能为空' }]
							})}>
							<Radio value={1}>保密</Radio>
							<Radio value={2}>先生</Radio>
							<Radio value={3}>女士</Radio>
						</Radio.Group>
					</Form.Item>

					<Form.Item label="所属平台" required>
						<Checkbox.Group
							{...init('platform', {
								rules: [
									{ required: true, message: '所属平台必须选择一项' },
									{
										validator: (name, value, callback) => {
											setTimeout(() => {
												callback(value.length < 2 ? '所属平台必须选择两个以上' : '');
											}, 300);
										}
									}
								]
							})}>
							<Checkbox value={1}>淘宝</Checkbox>
							<Checkbox value={2}>京东</Checkbox>
							<Checkbox value={3}>苏宁</Checkbox>
							<Checkbox value={4}>蘑菇街</Checkbox>
						</Checkbox.Group>
					</Form.Item>

					<Form.Item label="备注">
						<Input.Textarea autoSize minRows={2} placeholder="备注信息..." {...init('remarks')} />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 6 }}>
						<Button type="primary" style={{ marginRight: 10 }} onClick={this.onValidate.bind(this)}>
							提交
						</Button>
						<Button style={{ marginRight: 10 }} onClick={this.onReset.bind(this)}>
							重置
						</Button>
						<Button style={{ marginRight: 10 }} onClick={this.onClear.bind(this)}>
							清除
						</Button>
						<Button onClick={this.getValues.bind(this)}>获取所有值</Button>
					</Form.Item>
				</Form>
			</>
		);
	}
}

function User({ field: { init } }) {
	return (
		<Form.Nexus>
			<div style={{ display: 'inline-flex', alignItem: 'flex-start' }}>
				<div>
					<Input
						hasClear
						style={{ width: 140, marginRight: 10 }}
						placeholder="请输入名字"
						{...init('firstName', {
							rules: [{ required: true, message: '名字不能为空' }, { len: 10 }]
						})}
					/>
				</div>

				<div>
					<Input
						hasClear
						style={{ width: 100 }}
						placeholder="请输入姓氏"
						{...init('lastName', {
							rules: [{ required: true, message: '姓氏不能为空' }, { len: 10 }]
						})}
					/>
				</div>
			</div>
		</Form.Nexus>
	);
}
```
