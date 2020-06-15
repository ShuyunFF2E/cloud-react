import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { prefixCls, getRootDocument } from '@utils';

import './index.less';
import Icon from '../icon';

const rootDocument = getRootDocument();

const DEFAULTOPTS = { duration: 3000, contextContainer: rootDocument.body };

const MESSAGE_TYPE = {
	success: {
		icon: 'check-circle-solid'
	},
	error: {
		icon: 'warning-circle-solid'
	}
};

const wraperMap = new Map();
let wraper;

function removeWraper(contextContainer) {
	if (!wraperMap.get(contextContainer).children.length) {
		ReactDOM.unmountComponentAtNode(wraper);
		contextContainer.removeChild(wraper);
		wraper = null;
	}
}

function entity(config) {
	const { type, msg, options } = config;

	const opts = Object.assign({}, DEFAULTOPTS, options);
	const props = {
		type,
		msg,
		duration: opts.duration,
		contextContainer: opts.contextContainer
	};

	const { contextContainer } = props;
	wraper = wraperMap.get(contextContainer);

	if (!wraper) {
		wraper = rootDocument.createElement('div');
		wraperMap.set(contextContainer, wraper);
	}

	// 提示信息位置
	wraper.className = `${prefixCls}-message`;

	if (contextContainer.tagName !== 'BODY') {
		wraper.className = `${prefixCls}-message`;
		const { top } = contextContainer.getBoundingClientRect();
		wraper.style.top = `${top}px`;
	}

	const container = rootDocument.createElement('div');

	wraper.appendChild(container);

	contextContainer.appendChild(wraper);

	ReactDOM.render(<MessageEntity {...props} container={container} contextContainer={contextContainer} />, container);
}

class MessageEntity extends Component {
	constructor(props) {
		super(props);
		this.noticeRef = React.createRef();
		this.closed = false;
	}

	componentDidMount() {
		this.startTimer();
		setTimeout(() => {
			this.noticeRef.current.classList.add('fade-in');
		}, 100);
	}

	componentWillUnmount() {
		this.onHandleClose();
	}

	/**
	 * 关闭提示信息
	 */
	onHandleClose = () => {
		if (this.closed) {
			return;
		}
		this.closed = true;

		this.stopTimer();

		const { container, contextContainer } = this.props;
		const { current: currentNotice } = this.noticeRef;
		wraper = wraperMap.get(contextContainer);

		currentNotice.classList.add('fade-out');

		// 监听动画完成
		currentNotice.addEventListener(
			'webkitTransitionEnd',
			() => {
				ReactDOM.unmountComponentAtNode(container);
				wraper.removeChild(container);
				removeWraper(contextContainer);
			},
			{ once: true, capture: true }
		);
	};

	/**
	 * 自动关闭提示信息
	 */
	startTimer() {
		const { duration } = this.props;
		if (duration > 0) {
			this.timer = setTimeout(() => {
				this.onHandleClose();
			}, duration);
		}
	}

	/**
	 * 清除定时器
	 */
	stopTimer() {
		clearTimeout(this.timer);
	}

	render() {
		const { type, msg } = this.props;

		return (
			<div className={`${prefixCls}-message-${type} notice`} ref={this.noticeRef}>
				<Icon type={`${MESSAGE_TYPE[type].icon}`} className="tag-icon"></Icon>
				<div className="msg-text">{msg}</div>
				<Icon type="close" onClick={this.onHandleClose} className="close-icon"></Icon>
			</div>
		);
	}
}

const Message = {
	error(msg, options) {
		entity({
			type: 'error',
			msg,
			options
		});
	},
	success(msg, options) {
		entity({
			type: 'success',
			msg,
			options
		});
	}
};

MessageEntity.propTypes = {
	msg: PropTypes.node.isRequired,
	duration: PropTypes.number.isRequired
};

export default Message;
