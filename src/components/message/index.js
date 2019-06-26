import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.less';
import Icon from '../icon';

const DEFAULTOPTS = { duration: 3000 };

const MESSAGE_TYPE = {
	'success': {
		icon: 'check-circle-solid'
	},
	'error': {
		icon: 'warning-circle-solid'
	}
};

let wraper = null;

function removeWraper() {
	if (!wraper.children.length) {
		ReactDOM.unmountComponentAtNode(wraper);
		document.body.removeChild(wraper);
		wraper = null;
	}
}

function entity(props) {
	if (!wraper) {
		wraper = document.createElement('div');
	}
	wraper.classList.add('message');

	const container = document.createElement('div');

	ReactDOM.render(<MessageEntity {...props} container={container}/>, container);

	wraper.appendChild(container);
	document.body.appendChild(wraper)
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

		const { container } = this.props;
		const { current: currentNotice } = this.noticeRef;

		currentNotice.classList.add('fade-out');

		// 监听动画完成
		currentNotice.addEventListener('webkitTransitionEnd', () => {
			ReactDOM.unmountComponentAtNode(container);
			wraper.removeChild(container);
			removeWraper();

		}, { once: true, capture: true });
	};


	/**
	 * 自动关闭提示信息
	 */
	startTimer() {
		const { duration } = this.props;
		if (duration > 0) {
			this.timer = setTimeout(() => {
				this.onHandleClose();
			}, duration)
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
			<div className={`${type}-msg notice`} ref={this.noticeRef}>
				<Icon type={`${MESSAGE_TYPE[type].icon}`} className="tag-icon"></Icon>
				<p className="msg-text">{msg}</p>
				<Icon type="close" onClick={this.onHandleClose} className="close-icon"></Icon>
			</div>
		)
	}
}

const message = {
	error(msg, options) {
		const opts = Object.assign({}, DEFAULTOPTS, options);
		entity({
			type: 'error',
			msg,
			duration: opts.duration
		})
	},
	success(msg, options) {
		const opts = Object.assign({}, DEFAULTOPTS, options);
		entity({
			type: 'success',
			msg,
			duration: opts.duration
		})
	}
};

MessageEntity.propTypes = {
	msg: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired
};

export default message;
