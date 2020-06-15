---
order: 1
title: 基础用法
desc: 使用modal打开基本对话框，点击遮罩区域关闭对话框
---

```javascript
import React from 'react';
import { Button, Modal, Select, Datepicker, Form, Message } from 'cloud-react';

const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	// 打开弹出框
	openBasicModal = () => {
		this.setState({
			visible: true,
			clickMaskCanClose: false
		});
	};

	// 打开可在遮罩区域关闭的弹出框
	openMaskCloseModal = () => {
		this.setState({
			visible: true,
			showMask: true,
			clickMaskCanClose: true
		});
	};

	// 打开无遮罩层对话框
	openHideMaskModal = () => {
		this.setState({
			visible: true,
			showMask: false
		});
	};

	// 确认按钮回调函数
	handleOk = () => {
		this.setState({
			visible: false
		});
	};

	// 关闭回调函数
	handleClose = () => {
		this.setState({
			visible: false
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false
		});
	};

	showMessage = () => {
		Message.error('请输入内容');
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openBasicModal}>
					基本弹出框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openMaskCloseModal}>
					点击遮罩区域关闭对话框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openHideMaskModal}>
					不显示遮罩层
				</Button>
				<Modal
					title="basic title"
					visible={this.state.visible}
					showMask={this.state.showMask}
					clickMaskCanClose={this.state.clickMaskCanClose}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					onClose={this.handleClose}>
					<Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
						<Form.Item label="下拉选择">
							<Select isAppendToBody style={{ width: 200 }}>
								<Select.Option value={12}>选择我没错的</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="日期组件">
							<Datepicker.RangePicker isAppendToBody position="auto" width={400} />
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 4 }}>
							<Button type="primary" onClick={this.showMessage}>
								提交
							</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}
```
