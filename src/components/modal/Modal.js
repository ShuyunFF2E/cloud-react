/**
 * Modal.js
 * wangbo
 * 2019-06-21
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.less';
import Icon from '../icon';

const containers = {};
const defaultMessage = 'this is a message';

class Notification extends Component {

	// 默认值
	static defaultProps = {
		visible: false,
		title: '默认弹出框',
		header: '',
		children: 'hello, this is default body content',
		footer: '',
		hasFooter: true,
		onOk: () => {},
		onCancel: () => {},
		onClose: () => {}
	};

	static propTypes = {
		visible: PropTypes.bool,
		title: PropTypes.string,
		header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		footer: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		hasFooter: PropTypes.bool,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
		onClose: PropTypes.func,
	};

	// 关闭
	handleClose = id => {
		this.handleCloseModal(id);
		const {onClose} = this.props;
		onClose();
	};

	// 确认
	handleOk = id => {
		this.handleCloseModal(id);
		const {onOk} = this.props;
		onOk();
	};

	// 取消
	handleCancel = id => {
		this.handleCloseModal(id);
		const {onCancel} = this.props;
		onCancel();
	};

	// 删除节点
	handleCloseModal = id => {
		const container = containers[id];
		ReactDOM.unmountComponentAtNode(container);
		document.body.removeChild(container);
	};

	render() {
		const closeIconStyle = {
			float: 'right',
			position: 'relative',
			top: '-16px',
			color: '#CECECE',
			cursor: 'pointer'
		};

		const { id, type, title, header, children, footer, hasFooter, visible} = this.props;
		if (!visible) {
			return null;
		}
		return (
			<div>
				{/* 遮罩层 */}
				<div className="modal-mask"></div>
				{/* 弹出框 */}
				<div className="modal-container">
					{/* 标题区域 */}
					<header className={type === 'modal' ? 'modal-header' : 'hide-content'}>
						<div className={!header ? '' : 'hide-content'}>
							<span className="modal-title">{title}</span>
						</div>
						<div className={header ? 'define-header' : 'hide-content'}>
							{header}
						</div>
						<Icon type='x' onClick={() => this.handleClose(id)} style={closeIconStyle}></Icon>
					</header>

					{/* 主体区域 */}
					<section className="modal-body">
						<div className="modal-body-content">{children}</div>
					</section>

					{/* 底部区域 */}
					{/* hasFooter为true，未设置footer，是modal或confirm */}
					<footer className={hasFooter && !footer && (type === 'modal' || type === 'confirm') ? "modal-footer" : 'hide-content'}>
						<button type="button" className='btn modal-confirm-btn' onClick={() => this.handleOk(id)}>确认</button>
						<button type="button" className='btn modal-cancel-btn' onClick={() => this.handleCancel(id)}>取消</button>
					</footer>
					{/* 有footer */}
					<footer className={footer ? 'modal-footer' : 'hide-content'}>
						{footer}
					</footer>
					{/* 不是modal或confirm */}
					<footer className={type !== 'modal' && type !== 'confirm' ? 'modal-footer' : 'hide-content'}>
						<button type="button" className='btn modal-confirm-btn' onClick={() => this.handleCancel(id)}>知道了</button>
					</footer>
				</div>
			</div>
		)
	}
}

// 基础弹框
function Modal({visible, title, header, body, footer, hasFooter, onOk, onCancel, onClose}) {
	// 创建一个关联id
	const id = `modal${  new Date().getTime().toString()}`;
	containers[id]= document.createElement('div');
	ReactDOM.render(
		<Notification type='modal'
					  id={id}
					  visible={visible}
					  title={title}
					  header={header}
					  footer={footer}
					  hasFooter={hasFooter}
					  onOk={onOk}
					  onCancel={onCancel}
					  onClose={onClose}>
			{body}
		</Notification>,
		containers[id]
	);
	document.body.appendChild(containers[id]);
}

// 确认弹框
function Confirm({visible, message, body, onOk, onCancel, onClose}) {
	// 创建一个关联id
	const id = `confirm${  new Date().getTime().toString()}`;
	containers[id]= document.createElement('div');
	const confirmStyle = {
		fontSize: '24px',
		color: '#FAAD14',
		verticalAlign: 'text-bottom',
		padding: '10px'
	};
	ReactDOM.render(
		<Notification type='confirm'
					  id={id}
					  visible={visible}
					  body={body}
					  onOk={onOk}
					  onCancel={onCancel}
					  onClose={onClose}>
			<div>
				<header className="info-area">
					<Icon type='shixinwenhao' style={confirmStyle}></Icon>
					<span className="info-style">{message || defaultMessage}</span>
				</header>
				<section className="more-info-style">{body}</section>
			</div>
		</Notification>,
		containers[id]
	);
	document.body.appendChild(containers[id]);
}

// 信息弹框
function Info({visible, message, body}) {
	// 创建一个关联id
	const id = `info${  new Date().getTime().toString()}`;
	containers[id]= document.createElement('div');

	const infoStyle = {
		fontSize: '24px',
		color: '#1890FF',
		verticalAlign: 'text-bottom',
		padding: '10px'
	};
	ReactDOM.render(
		<Notification type="info"
					  id={id}
					  visible={visible}>
			<div>
				<header className="info-area">
					<Icon type='info' style={infoStyle}></Icon>
					<span className="info-style">{message || defaultMessage}</span>
				</header>
				<section className="more-info-style">{body}</section>
			</div>
		</Notification>,
		containers[id]
	);

	document.body.appendChild(containers[id]);
}

export default {Modal, Confirm, Info}
