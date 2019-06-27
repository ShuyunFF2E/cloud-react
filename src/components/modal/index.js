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
		const { visible, title, children, header, footer, hasFooter, onOk, onClose } = this.props;
		return(
			<Notification
				type='modal'
				visible={visible}
				title={title}
				header={header}
				footer={footer}
				hasFooter={hasFooter}
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
		type: 'confirm',
		icon: 'shixinwenhao',
		...props
	};
	return Prompt(config);
};

// info方法
Modal.info = (props) => {
	const config = {
		type: 'info',
		icon: 'info',
		...props
	};
	return Prompt(config);
};

// success方法
Modal.success = (props) => {
	const config = {
		type: 'success',
		icon: 'duihao',
		...props
	};
	return Prompt(config);
};

// error方法
Modal.error = (props) => {
	const config = {
		type: 'error',
		icon: 'clear',
		...props
	};
	return Prompt(config);
};

// warning方法
Modal.warning = (props) => {
	const config = {
		type: 'warning',
		icon: 'gantanhao',
		...props
	};
	return Prompt(config);
};

export default Modal;
