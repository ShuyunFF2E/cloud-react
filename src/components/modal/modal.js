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
		header: '',
		children: '',
		footer: '',
		hasFooter: true,
		onOk: () => {},
		onClose: () => {}
	};

	static propTypes = {
		visible: PropTypes.bool,
		title: PropTypes.string,
		header: PropTypes.node,
		children: PropTypes.node,
		footer: PropTypes.node,
		hasFooter: PropTypes.bool,
		onOk: PropTypes.func,
		onClose: PropTypes.func,
	};

	render() {
		const { visible, id, type, children, header, title, footer, hasFooter, onOk, onClose } = this.props;
		if (!visible) {
			return null;
		}
		return (
			<div>
				{/* 遮罩层 */}
				<ModalMask/>
				{/* 弹出框 */}
				<div className='modal-container'>
					<ModalHeader
						id={id}
						type={type}
						header={header}
						onClose={onClose}
						title={title}/>

					<ModalBody>
						{children}
					</ModalBody>

					<ModalFooter
						id={id}
						type={type}
						footer={footer}
						hasFooter={hasFooter}
						onClose={onClose}
						onOk={onOk}/>
				</div>
			</div>
		)
	}
}

function ModalMask() {
	return (
		<div className='modal-mask'></div>
	);
}

function ModalHeader({ type, title, header, onClose }) {
	if (type !== 'modal') {
		return null;
	}
	if (type === 'modal' && header) {
		return (
			<header className='modal-header'>
				{header}
			</header>
		);
	}

	return (
		<header className='modal-header'>
			<span className='modal-title'>{title}</span>
			<Icon type='x' className='close-icon' onClick={onClose}></Icon>
		</header>
	);
}

function ModalBody({ children }) {
	return (
		<section className='modal-body'>
			{children}
		</section>
	);
}

function ModalFooter({ type, footer, hasFooter, onClose, onOk }) {
	if (!hasFooter) {
		return null;
	}
	if (footer) {
		return (
			<footer className='modal-footer'>
				{footer}
			</footer>
		);
	}
	if (type !== 'modal' && type !== 'confirm') {
		return (
			<footer className='modal-footer'>
				<Button type='primary' onClick={onOk}>知道了</Button>
			</footer>
		);
	}
	return (
		<footer className='modal-footer'>
			<Button type='primary' className='modal-confirm-btn' onClick={onOk}>确认</Button>
			<Button type='normal' onClick={onClose}>取消</Button>
		</footer>
	);
}

export default Notification;
