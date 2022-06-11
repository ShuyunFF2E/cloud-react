---
order: 5
title: 3种尺寸规格
desc: 3种modal尺寸规格，高度会随内容进行自适应
---

```jsx

            /**
             * title: 基础用法
             * desc: 3种modal尺寸规格，高度会随内容进行自适应
             */
import React from 'react';
import { Button, Modal, Select, CPicker, Radio, Form, Message } from 'cloud-react';

const { RangePicker } = CPicker;

const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			size: 'medium',
			title: ''
		};
	}

	// 打开弹出框
	openSmallModal = () => {
		this.setState({
			visible: true,
			size: 'small',
			title: '小号弹窗S，宽600，高320(最小)'
		});
	};
	
	openMediumModal = () => {
		this.setState({
			visible: true,
			size: 'medium',
			title: '中号(默认)弹窗M，宽680，高320(最小)'
		});
	};
  	
	openLargeModal = () => {
		this.setState({
			visible: true,
			size: 'large',
			title: '大号弹窗L，宽920，高320(最小)'
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
				<Button type="primary" onClick={this.openSmallModal}>
					小号弹窗S
				</Button>
				{blank}
				<Button type="primary" onClick={this.openMediumModal}>
					中号(默认)弹窗M
				</Button>
				{blank}
				<Button type="primary" onClick={this.openLargeModal}>
					大号弹窗L
				</Button>
				{blank}
				<Modal
					title={this.state.title}
					size={this.state.size}
					visible={this.state.visible}
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
							<RangePicker allowClear showToday />
						</Form.Item>
						<Form.Item label="你的性别">
							<Radio.Group defaultValue={1}>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
								<Radio value={3}>未知</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 4 }}>
							<Button type="primary" onClick={this.showMessage}>提交</Button>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}
```
