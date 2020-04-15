import React, { Component } from 'react';
import classNames from 'classnames';
import { prefixCls } from '@utils';
import { CONFIG_PLACE } from './config';
import './index.less';

let targetEleOffset = '';
let tooltipEleOffset = '';

// 箭头高度常量 如果修改样式高度此处也要修改
const arrowHeight = 7;

/**
 * 根据传入的元素获取相对body位置信息
 * @param element: 当前元素
 * @returns {'width': number, 'height': number,...}
 */
function offsetBody(element) {
	const { width, height, bottom, top, left, right } = element.getBoundingClientRect();
	return {
		width,
		height,
		bottom,
		top,
		left,
		right
	};
}

/**
 * 根据传入的元素获取相对绝对定位的元素位置信息
 * @param element: 当前元素
 * @returns {'width': number, 'height': number,...}
 */
function offsetContainer(element) {
	const isRelative = window.getComputedStyle(element).position === 'relative';
	return {
		left: isRelative ? 0 : element.offsetLeft,
		top: isRelative ? 0 : element.offsetTop,
		width: element.offsetWidth,
		height: element.offsetHeight,
		right: isRelative ? element.offsetWidth : element.offsetWidth + element.offsetLeft,
		bottom: isRelative ? element.offsetHeight : element.offsetHeight + element.offsetTop
	};
}

/**
 * 根据传入的位置返回一个位置坐标
 * @param position: 位置
 * @returns {main: 'top';, vice: 'right'}
 */
function getPlacementObj(position) {
	const positionObj = {};
	if (position === 'auto') {
		// 当触发元素上边距大于tooltip元素自身高度 并且 触发元素中间点到左边距距离大于tooltip元素自身宽度
		if (targetEleOffset.top > tooltipEleOffset.height && targetEleOffset.left + targetEleOffset.width / 2 > tooltipEleOffset.width / 2) {
			return { main: 'top', vice: 'center' };
		}
		// 当触发元素下边距大于tooltip元素自身高度 并且 触发元素中间点到左边距距离大于tooltip元素自身宽度
		if (
			window.innerHeight - targetEleOffset.bottom > tooltipEleOffset.height &&
			targetEleOffset.left + targetEleOffset.width / 2 > tooltipEleOffset.width / 2
		) {
			return { main: 'bottom', vice: 'center' };
		}
		// 当触发元素左边距tooltip自身的宽度 并且 触发元素距离相对定位元素的高度减去自身高度大于tooltip元素自身高度一半
		if (targetEleOffset.left > tooltipEleOffset.width && targetEleOffset.bottom > tooltipEleOffset.height / 2) {
			return { main: 'left', vice: 'center' };
		}
		// 当触发元素上边距大于tooltip自身的宽度 并且 触发元素左边边距大于tooltip元素自身宽度
		if (targetEleOffset.top > tooltipEleOffset.height && window.innerWidth - targetEleOffset.right > tooltipEleOffset.width) {
			return { main: 'right', vice: 'center' };
		}
	}
	// 不是 auto 直接赋值
	const place = position.split('-');
	const [main, vice] = place;
	positionObj.main = main;
	positionObj.vice = vice || 'center';
	return positionObj;
}

/**
 * 计算 tooltip 的位置
 * @param place: 位置对象
 * @param tooltipEle: 元素
 */
function setComputeToolTipPosition(place, tooltipEle, scrollTop) {
	const _tooltipEle = tooltipEle;
	const { main, vice } = place;
	_tooltipEle.classList.add(`${main}-${vice}`);
	// 主定位计算
	switch (main) {
		case CONFIG_PLACE.top:
			_tooltipEle.style.top = `${targetEleOffset.top - arrowHeight - tooltipEleOffset.height + scrollTop}px`;
			break;
		case CONFIG_PLACE.bottom:
			_tooltipEle.style.top = `${targetEleOffset.bottom + arrowHeight + scrollTop}px`;
			break;
		case CONFIG_PLACE.right:
			_tooltipEle.style.left = `${targetEleOffset.right + arrowHeight}px`;
			break;
		case CONFIG_PLACE.left:
			_tooltipEle.style.left = `${targetEleOffset.left - arrowHeight - tooltipEleOffset.width}px`;
			break;
		// no default
	}
	// 副定位计算
	switch (vice) {
		case CONFIG_PLACE.top:
			_tooltipEle.style.top = `${targetEleOffset.top + scrollTop}px`;
			break;
		case CONFIG_PLACE.bottom:
			_tooltipEle.style.top = `${targetEleOffset.bottom - tooltipEleOffset.height + scrollTop}px`;
			break;
		case CONFIG_PLACE.right:
			_tooltipEle.style.left = `${targetEleOffset.right - tooltipEleOffset.width}px`;
			break;
		case CONFIG_PLACE.left:
			_tooltipEle.style.left = `${targetEleOffset.left}px`;
			break;
		case 'center':
			if (/^(top|bottom)$/.test(main)) {
				_tooltipEle.style.left = `${targetEleOffset.left - tooltipEleOffset.width / 2 + targetEleOffset.width / 2}px`;
			} else {
				_tooltipEle.style.top = `${targetEleOffset.top -
					targetEleOffset.height / 2 -
					tooltipEleOffset.height / 2 +
					targetEleOffset.height +
					scrollTop}px`;
			}
			break;
		// no default
	}
}

export default class ToolView extends Component {
	componentDidMount() {
		const { placement, targetEle, container } = this.props;
		const tooltipEle = this.tipRef;
		targetEleOffset = container() === document.body ? offsetBody(targetEle) : offsetContainer(targetEle);
		const scrollTop = container() === document.body ? document.documentElement.scrollTop : 0;
		tooltipEleOffset = offsetBody(tooltipEle);
		// 先根据传入的 placement 返回一个位置对象 {main: position, vice: position}
		const toolTipPos = getPlacementObj(placement);
		setComputeToolTipPosition(toolTipPos, tooltipEle, scrollTop);
	}

	render() {
		const { content, theme } = this.props;
		return (
			<div
				ref={el => {
					this.tipRef = el;
				}}
				className={classNames(`${prefixCls}-tooltip`, `is-${theme}`)}
				dangerouslySetInnerHTML={{ __html: content }}></div>
		);
	}
}
