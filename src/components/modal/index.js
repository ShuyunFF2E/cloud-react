import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import ContextProvider from '@contexts/context-provider';
import { getRootWindow, sandboxSelector } from '@utils';
import './index.less';
import Notification from './modal';
import Prompt from './prompt';

class Modal extends Component {
	static propTypes = {
		children: PropTypes.any
	};

	static defaultProps = {
		children: null
	};

	render() {
		const { children, ...props } = this.props;
		const rootWindow = getRootWindow();
		const rootDocument = rootWindow.document;

		return ReactDOM.createPortal(
			<ContextProvider.Provider
				value={{
					rootWindow,
					rootDocument,
					getContext: () => rootDocument.querySelector(`.${sandboxSelector}`) || rootDocument.body
				}}>
				<Notification type="modal" {...props}>
					{children}
				</Notification>
			</ContextProvider.Provider>,
			rootDocument.body
		);
	}
}

const randomId = len => {
	const genUnit = () =>
		Math.random()
			.toString(36)
			.substr(2);

	const randomUnit = genUnit();
	if (len <= 0) return randomUnit;
	if (len <= 11) return randomUnit.substr(0, len);

	let rs = '';
	while (rs.length < len) {
		rs += genUnit();
	}
	return rs.substr(0, len);
};

Modal.createModal = ModalEntity => {
	let container = null;

	const close = () => {
		if (container) {
			setTimeout(() => {
				ReactDOM.unmountComponentAtNode(container);
				document.body.removeChild(container);
			});
		}
	};

	const open = params => {
		const containerId = randomId(10);
		container = document.getElementById(containerId);
		if (!container) {
			container = document.createElement('div');
			container.id = containerId;
			document.body.appendChild(container);
		}
		const { onClose, onOk, onCancel, ...options } = params || {};
		return new Promise(resolve => {
			function handleClose() {
				close();
			}
			function handleCancel() {
				close();
			}
			function handleOk(result) {
				close();
				resolve(result);
			}

			ReactDOM.render(<ModalEntity visible onCancel={handleCancel} onClose={handleClose} onOk={handleOk} {...options} />, container);
		});
	};

	return { open, close };
};

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
