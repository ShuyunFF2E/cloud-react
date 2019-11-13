import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { prefixCls } from '@utils/config'

import Icon from '../icon';
import Button from '../button';

import './index.less';

class Notification extends Component {

	static defaultProps = {
		visible: false,
		style: {},
		title: 'title',
		children: '',
		footer: '',
		hasFooter: true,
		showMask: true,
		okText: '确定',
		cancelText: '取消',
		clickMaskCanClose: true,
		showConfirmLoading: false,
		onOk: () => {},
		onCancel: () => {},
		onClose: () => {}
	};

	static propTypes = {
		visible: PropTypes.bool,
		style: PropTypes.object,
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
		const { visible, style, id, type, children, title, footer, hasFooter, showMask, okText, cancelText, clickMaskCanClose, showConfirmLoading, onOk, onClose, onCancel } = this.props;
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

				<div className={classNames(`${prefixCls}-modal-container`)}>
					<ModalHeader
						id={id}
						type={type}
						onClose={onClose}
						title={title}/>
					<ModalBody style={style}>
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
		<div className={classNames(`${prefixCls}-modal-mask`)} onClick={clickMaskCanClose && showMask ? onClose : () => {}}></div>
	);
}

function ModalHeader({ type, title, onClose }) {
	if (type !== 'modal') {
		return null;
	}
	return (
		<header className={classNames(`${prefixCls}-modal-header`)}>
			<span className={classNames(`${prefixCls}-modal-title`)}>{title}</span>
			<Icon type="close" className="close-icon" onClick={onClose}></Icon>
		</header>
	);
}

function ModalBody({ style, children }) {
	return (
		<section className={classNames(`${prefixCls}-modal-body`)} style={style}>
			{children}
		</section>
	);
}

function ModalFooter({ type, footer, okText, cancelText, hasFooter, showConfirmLoading, onCancel, onOk }) {

	const footerClass = classNames(`${prefixCls}-modal-footer`);
	const confirmClass = classNames(`${prefixCls}-modal-confirm-btn`);

	if (!hasFooter) {
		return null;
	}
	if (footer) {
		return (
			<footer className={footerClass}>
				{footer}
			</footer>
		);
	}
	if (type !== 'modal' && type !== 'confirm') {
		return (
			<footer className={footerClass}>
				<Button type="primary" onClick={onCancel}>知道了</Button>
			</footer>
		);
	}
	return (
		<footer className={footerClass}>
			<Button type="primary" className={confirmClass} disabled={showConfirmLoading} onClick={onOk}>
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
	return (<span className={classNames(`${prefixCls}-modal-confirm-loading`)}></span>);
}

export default Notification;
