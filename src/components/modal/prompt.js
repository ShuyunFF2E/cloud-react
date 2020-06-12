import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getRootWindow } from '@utils';
import Icon from '../icon';
import Notification from './modal';
import Context from './config-provider';

import './index.less';

const containers = new Map();

const ENTER_KEY_CODE = 13;

class Prompt extends React.Component {
	static defaultProps = {
		isShowIcon: true,
		style: {},
		type: '',
		icon: '',
		body: '',
		onOk: () => {},
		onCancel: () => {}
	};

	static propTypes = {
		isShowIcon: PropTypes.bool,
		style: PropTypes.object,
		type: PropTypes.string,
		icon: PropTypes.string,
		body: PropTypes.node,
		onOk: PropTypes.func,
		onCancel: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			showConfirmLoading: false
		};
	}

	componentDidMount() {
		// 在 confirm 类型的时候，需要按回车触发确定事件
		if (this.props.type === 'confirm') {
			// 点击完以后，按钮还是处于聚焦状态，因此不断触发自己的click事件，导致弹框不断弹出
			[...this.document.querySelectorAll('button')].forEach(item => {
				item.addEventListener(
					'keydown',
					event => {
						event.preventDefault();
					},
					true
				);
			});
			this.document.body.addEventListener('keydown', this.handleKeydown);
		}
	}

	componentWillUnmount() {
		if (this.props.type === 'confirm') {
			this.document.body.removeEventListener('keydown', this.handleKeydown);
		}
	}

	/* eslint-disable-next-line */
	get window() {
		return getRootWindow();
	}

	/* eslint-disable-next-line */
	get document() {
		return this.window.document;
	}

	handleKeydown = event => {
		if (event.keyCode === ENTER_KEY_CODE) {
			this.handleOk();
		}
	};

	// 删除节点
	handleClose = () => {
		const { id } = this.props;
		const ele = containers.get(id);

		if (ele) {
			// 删除react组件节点
			ReactDOM.unmountComponentAtNode(ele);
			// 删除dom节点
			this.document.body.removeChild(ele);
			// 从 container 中移除当前销毁的 modal
			containers.delete(id);
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
		const result = onOk();
		// 判断是否是promise
		if (result instanceof Promise) {
			this.setState({
				showConfirmLoading: true
			});
			result
				.then(() => {
					this.setState({
						showConfirmLoading: false
					});
					this.handleClose();
				})
				.catch(err => {
					console.log(err);
				});
		} else if (result !== false) {
			this.handleClose();
		}
	};

	render() {
		const { isShowIcon, type, icon, body, iconStyle, style } = this.props;
		const promptStyle = {
			...style,
			width: style.width || '400px',
			height: style.height ? style.height : 'auto' || '171px',
			minWidth: style.width || '200px',
			minHeight: style.height || '171px'
		};
		const promptBodyStyle = {
			width: 'calc(100% - 40px)',
			height: 'calc(100% - 40px - 51px)',
			minHeight: style.height && 'calc(100% - 40px - 51px)'
		};

		return ReactDOM.createPortal(
			<Context.Provider value={{ rootDocument: this.document, rootWindow: this.window }}>
				<Notification
					visible
					type={type}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					bodyStyle={promptBodyStyle}
					modalStyle={promptStyle}
					showConfirmLoading={this.state.showConfirmLoading}>
					<div>
						<header className="info-area">
							{isShowIcon && <Icon type={icon} className={`icon-style ${type}-style`} style={iconStyle} />}
							<section className="more-info" style={{ ...style }}>
								{body}
							</section>
						</header>
					</div>
				</Notification>
			</Context.Provider>,
			this.document.body
		);
	}
}

function prompt({ isShowIcon, type, icon, body, onOk, onCancel, iconStyle, style }) {
	// 创建一个关联id
	const rootDocument = getRootWindow().document;
	const id = `prompt${new Date().getTime()}`;
	const ele = rootDocument.createElement('div');

	containers.set(id, ele);
	rootDocument.body.appendChild(ele);

	ReactDOM.render(
		<Prompt id={id} style={style} isShowIcon={isShowIcon} iconStyle={iconStyle} type={type} icon={icon} body={body} onOk={onOk} onCancel={onCancel} />,
		ele
	);
}

export default prompt;
