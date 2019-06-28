/**
 * index.js
 * wangbo
 * 2019-06-20
 */

import React, { Component } from 'react';
import './index.less';
import Notification from './modal';
import Prompt from './prompt';

class Modal extends Component{
	render() {
		const { visible, title, children, header, footer, hasFooter, onOk, onClose, okText, closeText, showMask, clickMaskCanClose, showConfirmLoading } = this.props;
		return(
			<Notification
				type='modal'
				visible={visible}
				title={title}
				header={header}
				footer={footer}
				hasFooter={hasFooter}
				showMask={showMask}
				okText={okText}
				closeText={closeText}
				clickMaskCanClose={clickMaskCanClose}
				showConfirmLoading={showConfirmLoading}
				onOk={onOk}
				onClose={onClose}>
				{children}
			</Notification>
		);
	}
}

// confirm方法
Modal.confirm = (props) => {
	const config = {
		...props,
		type: 'confirm',
		icon: 'shixinwenhao'
	};
	return Prompt(config);
};

// info方法
Modal.info = (props) => {
	const config = {
		...props,
		type: 'info',
		icon: 'info'
	};
	return Prompt(config);
};

// success方法
Modal.success = (props) => {
	const config = {
		...props,
		type: 'success',
		icon: 'duihao'
	};
	return Prompt(config);
};

// error方法
Modal.error = (props) => {
	const config = {
		...props,
		type: 'error',
		icon: 'clear'
	};
	return Prompt(config);
};

// warning方法
Modal.warning = (props) => {
	const config = {
		...props,
		type: 'warning',
		icon: 'gantanhao'
	};
	return Prompt(config);
};

export default Modal;
