/* eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import { CONFIG_PLACE } from './config';
import './index.less';

// 箭头高度常量 如果修改样式高度此处也要修改
const ARROW_HEIGHT = 7;

// 获取元素的绝对位置
function getAbsPosition(ele) {
	const rect = {
		left: ele.offsetLeft,
		top: ele.offsetTop,
		width: ele.offsetWidth,
		height: ele.offsetHeight
	};

	let _ele = ele.offsetParent;

	while (_ele) {
		rect.left += _ele.offsetLeft;
		rect.top += _ele.offsetTop;
		_ele = _ele.offsetParent;
	}

	return {
		...rect,
		right: rect.left + rect.width,
		bottom: rect.top + rect.height
	};
}

// 获取累计滚动位移（排除BODY）
function getScrollOffset(ele, type) {
	let scrollOffset = 0;
	let _ele = ele.parentNode;
	while (_ele && !Number.isNaN(Number(type ? _ele.scrollTop : _ele.scrollLeft)) && _ele.tagName !== 'BODY') {
		scrollOffset += type ? _ele.scrollTop : _ele.scrollLeft;
		_ele = _ele.parentNode;
	}

	return scrollOffset;
}

// 获取方向
function getDirection(tooltip, target, placement) {
	const { top, left } = getAbsPosition(target);
	const targetRect = target.getBoundingClientRect();

	let main = 'top';
	let vice = 'center';

	if (placement === 'auto') {
		if (top - tooltip.offsetHeight < top - targetRect.top) {
			main = 'bottom';
		}
		if (left + tooltip.offsetWidth > document.body.clientWidth) {
			vice = 'right';
		}
	} else if (!/-/.test(placement)) {
		main = placement;
	} else {
		[main, vice] = placement.split('-');
	}

	return [main, vice];
}

// 计算tooltip位置
export function getTooltipPositionInBody(tooltip, target, placement) {
	const { offsetWidth, offsetHeight } = tooltip;
	const { left, top, right, bottom, width, height } = getAbsPosition(target);

	const style = {};
	const [main, vice] = getDirection(tooltip, target, placement);

	switch (main) {
		case CONFIG_PLACE.top:
			style.top = top - offsetHeight - ARROW_HEIGHT;
			break;
		case CONFIG_PLACE.bottom:
			style.top = bottom + ARROW_HEIGHT;
			break;
		case CONFIG_PLACE.left:
			style.left = left - offsetWidth - ARROW_HEIGHT;
			break;
		case CONFIG_PLACE.right:
			style.left = right + ARROW_HEIGHT;
			break;
		// no default
	}

	switch (vice) {
		case CONFIG_PLACE.center:
			if ([CONFIG_PLACE.top, CONFIG_PLACE.bottom].includes(main)) {
				style.left = left + (width - offsetWidth) / 2;
			}
			if ([CONFIG_PLACE.left, CONFIG_PLACE.right].includes(main)) {
				style.top = top + (height - offsetHeight) / 2;
			}
			break;
		case CONFIG_PLACE.left:
			style.left = left;
			break;
		case CONFIG_PLACE.right:
			style.left = left - (offsetWidth - width);
			break;
		case CONFIG_PLACE.top:
			style.top = top;
			break;
		case CONFIG_PLACE.bottom:
			style.top = bottom - offsetHeight;
			break;
		// no default
	}

	return {
		...style,
		top: style.top - getScrollOffset(target, 'top'),
		left: style.left - getScrollOffset(target)
	};
}

export default class ToolView extends Component {
	state = {
		dir: '',
		style: {},
		show: false
	};

	tipRef = React.createRef();

	timer = null;

	componentDidMount() {
		const { placement, target } = this.props;
		const tooltip = this.tipRef.current;

		setTimeout(() => {
			this.setState(
				{
					style: getTooltipPositionInBody(tooltip, target, placement),
					dir: getDirection(tooltip, target, placement).join('-')
				},
				() => this.setState({ show: true })
			);
		}, 0);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	show() {
		this.timer = setTimeout(() => this.setState({ show: true }), 10);
	}

	closeTips = () => {
		this.props.closeTips();
	};

	render() {
		const { style, show, dir } = this.state;
		const { content, theme, className, overlayStyle, showArrow } = this.props;

		const props = {
			ref: this.tipRef,
			style: { ...style, ...overlayStyle },
			className: classNames(`${prefixCls}-tooltip`, `is-${theme}`, { 'no-arrow': !showArrow }, dir, { show }, className),
			onMouseLeave: this.closeTips
		};

		// 检测到非React节点时，使用html到方式插入
		if (typeof content !== 'object') {
			return (
				<div {...props}>
					<div dangerouslySetInnerHTML={{ __html: content }}/>
					<div className="extra-mask-element" />
				</div>
			);
		}

		return (
			<div {...props}>
				<div>{content}</div>
				<div className="extra-mask-element" />
			</div>
		);
	}
}
