---
order: 3
title: 测试日历组件
desc: 测试
---

```javascript
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Radio, Select, Toggle, InputNumber, Field, Datepicker } from 'cloud-react';

export default function FormHorizontalDemo() {
	const field = Field.useField();

	const onValidate = () => {
		field.validate((errs, values) => {
			console.log(values);
		});
	};

	const onReset = () => {
		field.reset();
	};

	const { init } = field;

	return (
		<Form layout="horizontal" labelCol={{ span: 6 }} field={field}>
                   <Form.Item label="年月日 时分秒">
        				<Datepicker
        					{...init('date1', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					maxDate={new Date('2024/5/1')}
        					showTimePicker={true}
        					canEdit
        				/>
        			</Form.Item>

        			<Form.Item label="年月日">
        				<Datepicker
        					{...init('date2', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					maxDate={new Date('2024/5/1')}
        					canEdit
        				/>
        			</Form.Item>

        			<Form.Item label="年">
        				<Datepicker.YearPicker
        					{...init('date3', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					canEdit
        				/>
        			</Form.Item>

        			<Form.Item label="年月">
        				<Datepicker.YearMonthPicker
        					{...init('date4', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					canEdit
        				/>
        			</Form.Item>

        			<Form.Item label="月日">
        				<Datepicker.MonthDayPicker
        					{...init('date5', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					canEdit
        				/>
        			</Form.Item>

                      <Form.Item label="月日">
        				<Datepicker.RangePicker
        					{...init('date6', {
        						rules: [{ required: true, message: '请输入时间' }]
        					})}
        					canEdit
        				/>
        			</Form.Item>


        	<Form.Item wrapperCol={{ offset: 6 }}>
        		<Button type="primary" style={{ marginRight: 10 }} onClick={onValidate}>
        			提交
        		</Button>
        		<Button onClick={onReset}>重置</Button>
        	</Form.Item>
        </Form>

	);
}
```
