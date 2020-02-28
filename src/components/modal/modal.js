import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils/config'
import Icon from '../icon';
import Button from '../button';
import './index.less';

class Notification extends Component {
	constructor(props) {
		super(props);
		this.modalRef = React.createRef();

		this.state = {
			modalId: new Date().getTime(),
			pageX: '',
			pageY: '',
			diffX: '',
			diffY: '',
			moving: false
		};
	}

	static defaultProps = {
		visible: false,
		modalStyle: {},
		bodyStyle: {},
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
		modalStyle: PropTypes.object,
		bodyStyle: PropTypes.object,
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

	// 组件装在完毕监听屏幕大小切换事件
	componentDidMount() {
		window.addEventListener('resize', this.screenChange);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.screenChange);
		this.onReset();
	}

	// 屏幕变化
	screenChange = () => {
		setTimeout(() => {
			const maskHeight = document.getElementById('mask') && document.getElementById('mask').offsetHeight;
			const modalHeight = this.modalRef && this.modalRef.offsetHeight;
			if (!this.modalRef || !this.modalRef.style || this.state.pageY) return;
			this.modalRef.style.top = `${(maskHeight - modalHeight) / 2}px`;
		}, 100);
	};

	// 获取鼠标点击title时的坐标、title的坐标以及两者的位移
	getPosition = e => {
		// 标题DOM元素titleDom
		const titleDom = e.target;
		// titleDom的坐标(视窗)
		const X = titleDom.getBoundingClientRect().left;
		// 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
		const ele = document.getElementById(this.state.modalId);
		// 设置可移动样式
		ele.style.cursor = 'move';

		const Y = ele.offsetTop;
		// 鼠标点击的坐标(页面)
		const mouseX = e.pageX;
		const mouseY = e.screenY;
		// 鼠标点击位置与modal的位移
		const diffX = mouseX - X;
		const diffY = mouseY - Y;
		return { X, Y, mouseX, mouseY, diffX, diffY }
	};

	/**
	 * 鼠标按下，设置modal状态为可移动，并注册鼠标移动事件
	 * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
	 * */
	onMouseDown = e => {
		const position = this.getPosition(e);
		window.onmousemove = this.onMouseMove;
		window.onmouseup = this.onMouseUp;
		this.setState({ moving: true, diffX: position.diffX, diffY: position.diffY })
	};

	// 松开鼠标，设置modal状态为不可移动
	onMouseUp = () => {
		const { moving } = this.state;
		const ele = document.getElementById(this.state.modalId);
		if (ele) {
			ele.style.cursor = 'default';
		}
		if (moving) {
			this.setState({ moving: false });
		}
	};

	// 鼠标移动重新设置modal的位置
	onMouseMove = e => {
		const { moving, diffX, diffY } = this.state;
		if (moving) {
			// 获取鼠标位置数据
			const position = this.getPosition(e);
			// 计算modal应该随鼠标移动到的坐标
			const x = position.mouseX - diffX;
			const y = position.mouseY - diffY;
			// 窗口大小，结构限制，需要做调整，减去侧边栏宽度
			const { clientWidth, clientHeight } = document.documentElement;
			const modal = document.getElementById(this.state.modalId);
			if (modal) {
				modal.style.margin = 0;

				// 计算modal坐标的最大值
				const maxHeight = clientHeight - modal.offsetHeight;
				const maxWidth = clientWidth - modal.offsetWidth;
				// 判断得出modal的最终位置，不得超出浏览器可见窗口
				// eslint-disable-next-line no-nested-ternary
				const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0;
				// eslint-disable-next-line no-nested-ternary
				const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0;
				this.setState({
					pageX: left,
					pageY: top
				});
			}
		}
	};

	onReset = () => {
		this.setState({
			pageX: '',
			pageY: '',
			diffX: '',
			diffY: '',
			moving: false
		})
	};

	render() {
		const { visible, modalStyle, bodyStyle, className, id, type, children, title, footer, hasFooter, showMask, okText, cancelText, clickMaskCanClose, showConfirmLoading, onOk, onClose, onCancel } = this.props;

		if (!visible && !showConfirmLoading) {
			return null;
		}

		const { pageX, pageY, moving } = this.state;
		const style = {
			...modalStyle,
			left: pageX,
			top: pageY
		};

		if (!moving) {
			this.screenChange();
		}

		return (
			<div id="mask" className={`${prefixCls}-modal`}>
				{/* 遮罩层 */}
				<ModalMask
					showMask={showMask}
					onClose={onClose}
					onReset={this.onReset}
					clickMaskCanClose={clickMaskCanClose}/>
				{/* 弹出框 */}
				<div ref={c=> { this.modalRef = c; }} id={this.state.modalId} className={classNames(`${prefixCls}-modal-container ${className}`)} style={style}>
					<ModalHeader
						id={id}
						type={type}
						onReset={this.onReset}
						onMouseDown={this.onMouseDown}
						onMouseUp={this.onMouseUp}
						onMouseMove={this.onMouseMove}
						onClose={onClose}
						title={title}/>

					<ModalBody style={bodyStyle}>
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
						onReset={this.onReset}
						onOk={onOk}/>
				</div>
			</div>
		)
	}
}

function ModalMask({ onReset, showMask, onClose, clickMaskCanClose }) {
	const close = () => {
		onClose();
		onReset();
	};
	return (
		showMask && <div className={classNames(`${prefixCls}-modal-mask`)} onClick={clickMaskCanClose && showMask ? close : () => {}}/>
	);
}

function ModalHeader({ type, title, onClose, onReset, onMouseDown, onMouseUp, onMouseMove }) {
	const close = () => {
		onClose();
		onReset();
	};
	const selected = e => {
		e.stopPropagation();
	};
	return (
		type === 'modal' && <header className={classNames(`${prefixCls}-modal-header`)} onMouseMoveCapture={e => onMouseMove(e)} onMouseDown={e => onMouseDown(e)} onMouseUp={e => onMouseUp(e)}>
			<span className={classNames(`${prefixCls}-modal-title`)} onMouseDown={event => selected(event)}>{title}</span>
			<Icon type="close" className="close-icon" onMouseDown={event => selected(event)} onClick={close}/>
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

/**
 * @return {null}
 */
function ModalFooter({ type, footer, okText, cancelText, hasFooter, showConfirmLoading, onCancel, onOk, onReset }) {
	const ok = () => {
		onOk();
		onReset();
	};
	const cancel = () => {
		onCancel();
		onReset();
	};
	const footerClass = classNames(`${prefixCls}-modal-footer`);
	const confirmClass = classNames(`${prefixCls}-modal-confirm-btn`);
	if (!hasFooter) {
		return null;
	}
	if (hasFooter && footer) {
		return (
			<footer className={footerClass}>
				{footer}
			</footer>
		);
	}
	if (hasFooter && type !== 'modal' && type !== 'confirm') {
		return (
			<footer className={footerClass}>
				<Button type="primary" onClick={cancel}>知道了</Button>
			</footer>
		);
	}
	return (
		<footer className={footerClass}>
			<Button type="primary" className={confirmClass} disabled={showConfirmLoading} onClick={ok}>
				<ConfirmLoading showConfirmLoading={showConfirmLoading}/>
				{okText}
			</Button>
			<Button type="normal" disabled={showConfirmLoading} onClick={cancel}>{cancelText}</Button>
		</footer>
	);
}

function ConfirmLoading({ showConfirmLoading }) {
	return (showConfirmLoading && <span className={classNames(`${prefixCls}-modal-confirm-loading`)}/>);
}

export default Notification;
