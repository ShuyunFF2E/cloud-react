---
order: 6
title: 确认对话框
desc: 使用confirm快捷弹出确认对话框
---

```jsx

            /**
             * title: 确认对话框
             * desc: 使用confirm快捷弹出确认对话框
             */
import React from 'react';
import { Button, Modal } from 'cloud-react';

const blank = '\u00A0';

export default class ModalDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
	}

	handleOk = () => {
		this.setState({
			content: 'it is ok'
		});
	};

	openConfirmModal = () => {
		Modal.confirm({
			isShowIcon: false,
			body: 'something you can write here something you can write here something you can write here something you can write here something you can write here something you can write here',
			onOk: () => {
				this.handleOk();
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	};

    openCustomerIconConfirmModal = () => {
            Modal.confirm({
                isShowIcon: true,
                icon: 'warning-circle-solid',
                iconStyle: {
                    color: '#ffcf33'
                },           
                title: '确认要删除吗？',
                body: '确认要删除该条目？',
                onOk: () => {
                    this.handleOk();
                },
                onCancel: () => {
                    this.setState({
                        content: 'it is cancel'
                    });
                }
            });
        };


	openCustomConfirmModal = () => {
		Modal.confirm({
			okText: '好',
			cancelText: '关闭',
			body: '按钮的文案修改了'
		});
	}

	// 打开确认弹出框
	openAsyncConfirmModal = () => {
		Modal.confirm({
			body: 'this is a async demo，do you want to test it ？ if you want, please click the button',
			onOk: () => {
				return new Promise((resolve, reject) => {
					setTimeout(Math.random() > 0.5 ? resolve : reject, 2000);
				}).catch(() => {
					console.log('error');
				});
			},
			onCancel: () => {
				this.setState({
					content: 'it is cancel'
				});
			}
		});
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={this.openConfirmModal}>
					基础确认对话框
				</Button>
				{blank}
                <Button type="primary" onClick={this.openCustomerIconConfirmModal}>
					自定义图标确认对话框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openAsyncConfirmModal}>
					异步确认对话框
				</Button>
				{blank}
				<Button type="normal" onClick={this.openCustomConfirmModal}>
					修改按钮文案
				</Button>
				{blank}
				<br />
				<br />
				{this.state.content}
			</div>
		);
	}
}
```