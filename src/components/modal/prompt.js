import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Notification from './modal';

import './index.less';

const containers = {};

class Prompt extends React.Component{
	static defaultProps = {
		type: '',
		icon: '',
		body: '',
		onOk: () => {},
		onCancel: () => {},
	};

	static propTypes = {
		type: PropTypes.string,
		icon: PropTypes.string,
		body: PropTypes.node,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			showConfirmLoading: false
		};
	}

	// 删除节点
	handleClose = () => {
		const { id } = this.props;
		if (containers[id]) {
			// 删除react组件节点
			ReactDOM.unmountComponentAtNode(containers[id]);
			// 删除dom节点
			document.body.removeChild(containers[id]);
		}
	};

	// 取消
	handleCancel = () => {
		const { onCancel } = this.props;
		this.handleClose();
		onCancel();
	};

	// 确定
	handleOk = () => {
		const { onOk } = this.props;
		const callback = onOk();
		// 判断是否是promise
		if (callback instanceof Promise) {
			this.setState({
				showConfirmLoading: true
			});
			callback.then(() => {
				this.setState({
					showConfirmLoading: false
				});
				this.handleClose();
			}).catch(err => {
				console.log(err);
			});
		} else {
			this.handleClose();
		}
	};

	render() {
		const { type, icon, body } = this.props;
		return (
			<Notification
				visible
				type={type}
				showConfirmLoading={this.state.showConfirmLoading}
				onCancel={this.handleCancel}
				onOk={this.handleOk}>
				<div>
					<header className="info-area">
						<Icon type={icon} className={`icon-style ${type}-style` }></Icon>
						<section className="more-info">{body}</section>
					</header>
				</div>
			</Notification>
		);
	}
}

function prompt({ type, icon, body, onOk, onCancel }) {
	// 创建一个关联id
	const id = `prompt${new Date().getTime()}`;
	containers[id] = document.createElement('div');
	document.body.appendChild(containers[id]);

	ReactDOM.render(
		<Prompt
			id={id}
			type={type}
			icon={icon}
			body={body}
			onOk={onOk}
			onCancel={onCancel}/>,
		containers[id]
	);
}

export default prompt;
