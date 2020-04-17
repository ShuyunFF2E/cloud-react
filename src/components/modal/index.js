import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { getRootDocument } from '@utils';
import './index.less';
import Notification from './modal';
import Prompt from './prompt';

class Modal extends Component {
	static propTypes = {
		getPopupContainer: PropTypes.func,
		children: PropTypes.any
	};

	static defaultProps = {
		getPopupContainer: () => getRootDocument().body,
		children: null
	};

	render() {
		const { getPopupContainer, children, ...props } = this.props;

		const Child = (
			<Notification type="modal" {...props}>
				{children}
			</Notification>
		);

		return ReactDOM.createPortal(Child, getPopupContainer());
	}
}

// confirm方法
Modal.confirm = props => {
	const config = {
		...props,
		type: 'confirm',
		icon: props.icon || 'question-circle-solid'
	};
	return Prompt(config);
};

// info方法
Modal.info = props => {
	const config = {
		...props,
		type: 'info',
		icon: props.icon || 'info-circle'
	};
	return Prompt(config);
};

// success方法
Modal.success = props => {
	const config = {
		...props,
		type: 'success',
		icon: props.icon || 'check-circle-solid'
	};
	return Prompt(config);
};

// error方法
Modal.error = props => {
	const config = {
		...props,
		type: 'error',
		icon: props.icon || 'close-circle-solid'
	};
	return Prompt(config);
};

// warning方法
Modal.warning = props => {
	const config = {
		...props,
		type: 'warning',
		icon: props.icon || 'warning-circle-solid'
	};
	return Prompt(config);
};

export default Modal;
