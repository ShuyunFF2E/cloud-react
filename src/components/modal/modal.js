/**
 * modal.js
 * wangbo
 * 2019-06-21
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import Icon from '../icon';
import Button from '../button';

class Notification extends Component {

	static defaultProps = {
		visible: false,
		title: 'title',
		children: '',
		footer: '',
		hasFooter: true,
		showMask: true,
		okText: '确定',
		cancelText: '取消',
		clickMaskCanClose: false,
		showConfirmLoading: false,
		onOk: () => {},
		onCancel: () => {},
		onClose: () => {}
	};

	static propTypes = {
		visible: PropTypes.bool,
		title: PropTypes.string,
		children: PropTypes.node,
		footer: PropTypes.node,
		okText: PropTypes.string,
		cancelText: PropTypes.string,
		hasFooter: PropTypes.bool,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func,
		showMask: PropTypes.bool,
		showConfirmLoading: PropTypes.bool,
		clickMaskCanClose: PropTypes.bool
	};

	render() {
		const { visible, id, type, children, title, footer, hasFooter, showMask, okText, cancelText, clickMaskCanClose, showConfirmLoading, onOk, onClose, onCancel } = this.props;
		if (!visible && !showConfirmLoading) {
			return null;
		}
		return (
			<div>
				{/* 遮罩层 */}
				<ModalMask
					showMask={showMask}
					onClose={onClose}
					clickMaskCanClose={clickMaskCanClose}/>
				{/* 弹出框 */}
				<div className="modal-container">
					<ModalHeader
						id={id}
						type={type}
						onClose={onClose}
						title={title}/>

					<ModalBody>
						{children}
					</ModalBody>

					<ModalFooter
						id={id}
						type={type}
						okText={okText}
						cancelText={cancelText}
						showConfirmLoading={showConfirmLoading}
						footer={footer}
						hasFooter={hasFooter}
						onCancel={onCancel}
						onOk={onOk}/>
				</div>
			</div>
		)
	}
}

function ModalMask({ showMask, onClose, clickMaskCanClose }) {
	if (!showMask) {
		return null;
	}
	return (
		<div className="modal-mask" onClick={clickMaskCanClose && showMask ? onClose : () => {}}></div>
	);
}

function ModalHeader({ type, title, onClose }) {
	if (type !== 'modal') {
		return null;
	}
	return (
		<header className="modal-header">
			<span className="modal-title">{title}</span>
			<Icon type="close" className="close-icon" onClick={onClose}></Icon>
		</header>
	);
}

function ModalBody({ children }) {
	return (
		<section className="modal-body">
			{children}
		</section>
	);
}

function ModalFooter({ type, footer, okText, cancelText, hasFooter, showConfirmLoading, onCancel, onOk }) {
	if (!hasFooter) {
		return null;
	}
	if (footer) {
		return (
			<footer className="modal-footer">
				{footer}
			</footer>
		);
	}
	if (type !== 'modal' && type !== 'confirm') {
		return (
			<footer className="modal-footer">
				<Button type="primary" onClick={onCancel}>知道了</Button>
			</footer>
		);
	}
	return (
		<footer className="modal-footer">
			<Button type="primary" className="modal-confirm-btn" disabled={showConfirmLoading} onClick={onOk}>
				<ConfirmLoading showConfirmLoading={showConfirmLoading}/>
				{okText}
			</Button>
			<Button type="normal" disabled={showConfirmLoading} onClick={onCancel}>{cancelText}</Button>
		</footer>
	);
}

function ConfirmLoading({ showConfirmLoading }) {
	if (!showConfirmLoading) {
		return null;
	}
	return (<span className="modal-confirm-loading"></span>);
}

export default Notification;
