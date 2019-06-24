import React  from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.less';
import Icon from '../icon';

const AUTO_CLOSE_DELAY = 3;

const MESSAGE_TYPE = {
	'success': {
		color: '#389d25',
		icon: 'duihao'
	},
	'error': {
		color: '#ff5243',
		icon: 'gantanhao'
	}
};

class MessageEntity extends React.Component {

	componentDidMount() {
		this.startTimer();
	}


	onHandleClose = () => {
		this.stopTimer();
		const { container } = this.props;
		container.style.animation = 'disappear 0.8s';

		setTimeout(() => {
			ReactDOM.unmountComponentAtNode(container);
			const messageBox = document.getElementById('message');
			messageBox.removeChild(container);
		}, 400)

	};

	componentWillUnment() {
		this.stopTimer();
	}

	/**
	 * 自动关闭提示信息
	 */
	startTimer() {
		const {duration} = this.props;

		if (duration > 0) {
			this.timeOut = setTimeout(() => {
				this.onHandleClose();
			}, duration * 1000)
		}
	}

	/**
	 * 清除定时器
	 */
	stopTimer() {
		clearTimeout(this.timeOut);
	}

	render() {
		const {type, message} = this.props;

		const iconCloseStyle= {fontSize: 12, cursor: 'pointer', opacity: .6, marginLeft: '20px'};
		const iconTypeStyle = {color: `${MESSAGE_TYPE[type].color}`, fontSize: "16px"};

		return (
			<div className="message-content">
				<Icon type={`${MESSAGE_TYPE[type].icon}`} style={iconTypeStyle}></Icon>
				<p className="msg-text">{message}</p>
				<Icon type="x" style={iconCloseStyle} onClick={this.onHandleClose}></Icon>
			</div>
		)
	}
}


const Message = {
	entity(props) {
		const {type} = props;
		const messageBox = document.getElementsByClassName('message');

		if (!messageBox.length) {
			this.container = document.createElement('div');
			this.container.className = 'message';
			this.container.id = 'message';
			document.body.appendChild(this.container);
		}
		const messageNotice = document.createElement('div');
		messageNotice.className = `${type}-msg notice`;

		this.container.appendChild(messageNotice);

		ReactDOM.render(<MessageEntity container={messageNotice} {...props}/>, messageNotice);

	},
	error(message, duration) {
		this.entity({type: 'error', message, duration})
	},
	success(message, duration) {
		this.entity({type: 'success', message, duration})
	}
};

MessageEntity.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	duration: PropTypes.number
};

MessageEntity.defaultProps = {
	duration: AUTO_CLOSE_DELAY
};

export default Message;

