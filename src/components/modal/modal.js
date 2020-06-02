import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls, getRootDocument } from '@utils';
import Icon from '../icon';
import Button from '../button';
import './index.less';

class Notification extends Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();

		this.state = {
			pageX: '',
			pageY: '',
			diffX: '',
			diffY: '',
			height: 0
		};
	}

	static defaultProps = {
		visible: false,
		modalStyle: {},
		bodyStyle: {},
		disabledOk: false,
		title: 'title',
		children: '',
		footer: '',
		hasFooter: true,
		showMask: true,
		okText: '确定',
		cancelText: '取消',
		clickMaskCanClose: true,
		showConfirmLoading: false,
		ignoreFrame: false,
		onOk: () => {},
		onCancel: () => {},
		onClose: () => {}
	};

	static propTypes = {
		visible: PropTypes.bool,
		modalStyle: PropTypes.object,
		bodyStyle: PropTypes.object,
		disabledOk: PropTypes.bool,
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
		clickMaskCanClose: PropTypes.bool,
		ignoreFrame: PropTypes.bool
	};

	// 组件装在完毕监听屏幕大小切换事件
	componentDidMount() {
		if (this.props.visible) {
			this.addTransition();
		}

		this.screenChange();
		window.addEventListener('resize', this.screenChange);
	}

	componentDidUpdate({ visible: prevVisible }) {
		const { visible } = this.props;

		if (prevVisible !== visible && visible) {
			this.addTransition();
			this.screenChange();
		}

		if (this.modalRef) {
			this.refreshHeight();
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.screenChange);
	}

	rootDocument = getRootDocument(this.props.ignoreFrame);

	get modalRef() {
		return this.ref.current;
	}

	/* eslint-disable-next-line */
	get mask() {
		return this.rootDocument.getElementById('mask');
	}

	// 高度变化
	refreshHeight() {
		const { height } = this.modalRef.getBoundingClientRect();
		const { height: prevHeight } = this.state;

		if (height !== prevHeight) {
			this.setState({
				height
			});
			this.screenChange();
		}
	}

	// 屏幕变化
	screenChange = () => {
		if (!this.modalRef || !this.modalRef.style || this.state.pageY) return;

		window.requestAnimationFrame(() => {
			const maskHeight = this.mask && this.mask.offsetHeight;
			const modalHeight = this.modalRef && this.modalRef.offsetHeight;
			if (this.modalRef) {
				this.modalRef.style.top = `${(maskHeight - modalHeight) / 2}px`;
				this.modalRef.style.opacity = 1;
			}
		});
	};

	removeTransition() {
		this.modalRef.classList.remove('transition');
	}

	addTransition() {
		this.modalRef.classList.add('transition');
	}

	// 获取鼠标点击title时的坐标、title的坐标以及两者的位移
	getPosition = ({ target: titleDom, pageX, screenY }) => {
		// titleDom的坐标(视窗)
		const X = titleDom.getBoundingClientRect().left;

		// 由于Y轴出现滚动条，需要与鼠标保持一致，存储页面相对位置
		const Y = this.modalRef.offsetTop;

		// 鼠标点击的坐标(页面)
		const mouseX = pageX;
		const mouseY = screenY;

		// 鼠标点击位置与modal的位移
		const diffX = mouseX - X;
		const diffY = mouseY - Y;

		return { X, Y, mouseX, mouseY, diffX, diffY };
	};

	/**
	 * 鼠标按下，注册鼠标移动事件
	 * 计算鼠标按下时，指针所在位置与modal位置以及两者的差值
	 * */
	onMouseDown = evt => {
		const { diffX, diffY } = this.getPosition(evt);

		this.rootDocument.addEventListener('mousemove', this.onMouseMove);
		this.rootDocument.addEventListener('mouseup', this.onMouseUp);

		this.removeTransition();
		this.setState({ diffX, diffY });
	};

	// 松开鼠标
	onMouseUp = () => {
		this.rootDocument.removeEventListener('mousemove', this.onMouseMove);
		this.rootDocument.removeEventListener('mouseup', this.onMouseUp);
	};

	// 鼠标移动重新设置modal的位置
	onMouseMove = evt => {
		window.requestAnimationFrame(() => {
			const { diffX, diffY } = this.state;

			// 获取鼠标位置数据
			const position = this.getPosition(evt);
			// 计算modal应该随鼠标移动到的坐标
			const x = position.mouseX - diffX;
			const y = position.mouseY - diffY;

			// 窗口大小，结构限制，需要做调整，减去侧边栏宽度
			const { clientWidth, clientHeight } = this.rootDocument.documentElement;
			const modal = this.modalRef;

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

				this.setState({ pageX: left, pageY: top });
			}
		});

		// 阻止默认行为(拖动时文字选中)
		evt.preventDefault();
	};

	onReset = () => {
		this.setState({ pageX: '', pageY: '', diffX: '', diffY: '' });
	};

	render() {
		const {
			visible,
			modalStyle,
			bodyStyle,
			disabledOk,
			className,
			type,
			children,
			title,
			footer,
			hasFooter,
			showMask,
			okText,
			cancelText,
			clickMaskCanClose,
			showConfirmLoading,
			onOk,
			onClose,
			onCancel
		} = this.props;

		if (!visible && !showConfirmLoading) {
			return null;
		}

		const { pageX, pageY } = this.state;

		const style = {
			...modalStyle,
			left: pageX,
			top: pageY,
			pointerEvents: 'auto'
		};

		return (
			<div
				id="mask"
				className={classnames(`${prefixCls}-modal`, {
					'other-area-can-click': !showMask
				})}>
				{/* 遮罩层 */}
				<ModalMask showMask={showMask} onClose={onClose} onReset={this.onReset} clickMaskCanClose={clickMaskCanClose} />

				{/* 弹出框 */}
				<div ref={this.ref} style={style} className={classnames(`${prefixCls}-modal-container`, className)}>
					<ModalHeader type={type} onReset={this.onReset} onMouseDown={this.onMouseDown} onClose={onClose} title={title} />

					<ModalBody style={{ ...bodyStyle }}>{children}</ModalBody>

					<ModalFooter
						visible={visible}
						type={type}
						onOk={onOk}
						footer={footer}
						okText={okText}
						onReset={this.onReset}
						onCancel={onCancel}
						hasFooter={hasFooter}
						cancelText={cancelText}
						disabledOk={disabledOk}
						showConfirmLoading={showConfirmLoading}
					/>
				</div>
			</div>
		);
	}
}

function ModalMask({ onReset, showMask, onClose, clickMaskCanClose }) {
	const close = () => {
		onReset();
		onClose();
	};
	return showMask && <div className={classnames(`${prefixCls}-modal-mask`)} onClick={clickMaskCanClose ? close : () => {}} />;
}

function ModalHeader({ type, title, onClose, onReset, ...props }) {
	const close = () => {
		onReset();
		onClose();
	};
	const selected = e => {
		e.stopPropagation();
	};
	return (
		type === 'modal' && (
			<header {...props} className={classnames(`${prefixCls}-modal-header`)}>
				<span className={classnames(`${prefixCls}-modal-title`)} onMouseDown={event => selected(event)}>
					{title}
				</span>
				<Icon type="close" className="close-icon" onMouseDown={event => selected(event)} onClick={close} />
			</header>
		)
	);
}

function ModalBody({ style, children }) {
	return (
		<section className={classnames(`${prefixCls}-modal-body`)} style={style}>
			{children}
		</section>
	);
}

/**
 * @return {null}
 */
function ModalFooter({ visible, type, footer, okText, cancelText, hasFooter, showConfirmLoading, onCancel, onOk, onReset, disabledOk }) {
	const ok = () => {
		onOk();
		if (!visible) {
			onReset();
		}
	};
	const cancel = () => {
		onReset();
		onCancel();
	};
	const footerClass = classnames(`${prefixCls}-modal-footer`);
	const confirmClass = classnames(`${prefixCls}-modal-confirm-btn`);
	if (!hasFooter) {
		return null;
	}

	if (hasFooter && footer) {
		return <footer className={footerClass}>{footer}</footer>;
	}

	if (hasFooter && type !== 'modal' && type !== 'confirm') {
		return (
			<footer className={footerClass}>
				<Button type="primary" onClick={cancel}>
					知道了
				</Button>
			</footer>
		);
	}

	return (
		<footer className={footerClass}>
			<Button type="primary" className={confirmClass} disabled={showConfirmLoading || disabledOk} onClick={ok} loading={showConfirmLoading}>
				{okText}
			</Button>
			<Button type="normal" disabled={showConfirmLoading} onClick={cancel}>
				{cancelText}
			</Button>
		</footer>
	);
}

export default Notification;
