import React, { Component } from 'react';
import classNames from "classnames";
import './index.less';

// 箭头高度常量 如果修改样式高度此处也要修改
const arrowHeight = 3;

/**
 * 根据传入的位置返回一个位置坐标
 * @param position: 位置
 * @param targetEle: 鼠标触发的元素
 * @param tooltipEle: 显示的 tooltip 元素
 * @returns {main: 'top';, vice: 'right'}
 */
function getPlacementObj(position, targetEle, tooltipEle) {
	const positionObj = {};

	if (position === 'auto') {
		const targetEleOffsetTop = targetEle.offsetTop;
		const targetEleOffsetLeft = targetEle.offsetLeft;
		const targetEleOffsetWidth = targetEle.offsetWidth;
		const targetEleOffsetHeight = targetEle.offsetHeight;
		const targetEleParentHeight = targetEle.offsetParent.offsetHeight;
		const targetEleParentWidth = targetEle.offsetParent.offsetWidth;
		const tooltipEleOffsetHeight = tooltipEle.offsetHeight;
		const tooltipEleOffsetWidth = tooltipEle.offsetWidth;
		// 当触发元素距离相对定位元素的高度大于tooltip元素自身高度 并且 触发元素中间距离相对定位元素的长度大于tooltip元素自身宽度
		if (targetEleOffsetTop > tooltipEleOffsetHeight && targetEleOffsetLeft + targetEleOffsetWidth / 2 > tooltipEleOffsetWidth / 2) {
			return { main: 'top', vice: 'center' };
		}
		// 当触发元素底部距离相对定位元素的底部大于tooltip元素自身高度 并且 触发元素中间距离相对定位元素的长度大于tooltip元素自身宽度
		if (targetEleParentHeight - targetEleOffsetTop - targetEleOffsetHeight > tooltipEleOffsetHeight && targetEleOffsetLeft + targetEleOffsetWidth / 2 > tooltipEleOffsetWidth / 2) {
			return { main: 'bottom', vice: 'center' };
		}
		// 当触发元素距离相对定位元素的offsetLeft大于tooltip自身的宽度 并且 触发元素距离相对定位元素的高度减去自身高度大于tooltip元素自身高度一半
		if (targetEleOffsetLeft > tooltipEleOffsetWidth && targetEleOffsetTop - targetEleOffsetHeight > tooltipEleOffsetHeight / 2) {
			return { main: 'left', vice: 'center' };
		}
		// 当触发元素距离相对定位元素的高度大于tooltip自身的宽度 并且 触发元素距离相对定位元素的右边距大于tooltip元素自身宽度
		if (targetEleOffsetTop > tooltipEleOffsetHeight && targetEleParentWidth - targetEleOffsetLeft + targetEleOffsetWidth > tooltipEleOffsetWidth) {
			return { main: 'right', vice: 'center' }
		}
		return positionObj;
	}
	// 不是 auto 直接赋值
	const place = position.split('-');
	const [ main, vice ] = place;
	positionObj.main = main;
	positionObj.vice = vice || 'center';
	return positionObj;
}

/**
 * 计算 tooltip 的位置
 * @param place: 位置对象
 * @param appendToBody: 是否插入到 body
 * @param targetEle: 触发元素
 * @param tooltipEle: 元素
 */
function setComputeToolTipPosition(place, appendToBody, targetEle, tooltipEle) {
	const _tooltipEle = tooltipEle;
	const { main, vice } = place;
	const targetEleOffsetWidth = targetEle.offsetWidth;
	const targetEleOffsetHeight = targetEle.offsetHeight;
	const tooltipEleOffsetHeight = tooltipEle.offsetHeight;
	const tooltipEleOffsetWidth = tooltipEle.offsetWidth;
	const tooltipEleOffsetTop = tooltipEle.offsetTop;
	const tooltipEleOffsetLeft = tooltipEle.offsetLeft;
	_tooltipEle.classList.add(`${main}-${vice}`);
	const _tooltipElePos = {
		top: appendToBody ? targetEle.getBoundingClientRect().top : targetEle.offsetTop,
		left: appendToBody ? targetEle.getBoundingClientRect().left : targetEle.offsetLeft
	};
	// 主定位计算
	switch (main) {
		case 'top':
			_tooltipElePos.top = tooltipEleOffsetTop - arrowHeight - targetEleOffsetHeight - tooltipEleOffsetHeight;
			break;
		case 'bottom':
			_tooltipElePos.top = tooltipEleOffsetTop + arrowHeight;
			break;
		case 'right':
			_tooltipElePos.left = tooltipEleOffsetLeft + arrowHeight + targetEleOffsetWidth;
			break;
		case 'left':
			_tooltipElePos.left = tooltipEleOffsetLeft - arrowHeight - tooltipEleOffsetWidth;
			break;
		// no default
	}
	// 副定位计算
	switch (vice) {
		case 'top':
			_tooltipElePos.top = _tooltipElePos.top;
			break;
		case 'bottom':
			_tooltipElePos.top = _tooltipElePos.top - tooltipEleOffsetHeight + targetEleOffsetHeight;
			break;
		case 'right':
			_tooltipElePos.left = _tooltipElePos.left - tooltipEleOffsetWidth + targetEleOffsetWidth ;
			break;
		case 'left':
			_tooltipElePos.left = _tooltipElePos.left;
			break;
		case 'center':
			if (/^(top|bottom)$/.test(main)) {
				_tooltipElePos.left = _tooltipElePos.left - tooltipEleOffsetWidth / 2 + targetEleOffsetWidth / 2;
			} else {
				_tooltipElePos.top = _tooltipElePos.top - targetEleOffsetHeight / 2 - tooltipEleOffsetHeight /2  + targetEleOffsetHeight;
			}
			break;
		// no default
	}
	_tooltipEle.style.top = `${_tooltipElePos.top}px`;
	_tooltipEle.style.left = `${_tooltipElePos.left}px`;
}



export default class Toolview extends Component{

	componentDidMount() {
		const { placement, appendToBody, targetEle } = this.props;
		const tooltipEle = this.tipRef;
		// 先根据传入的 placement 返回一个位置对象 {main: position, vice: position}
		const toolTipPos = getPlacementObj(placement, targetEle, tooltipEle);
		if (appendToBody) {
			tooltipEle.style.top = `${targetEle.getBoundingClientRect().top + targetEle.offsetHeight}px`;
			tooltipEle.style.left = `${targetEle.getBoundingClientRect().left}px`;
		}
		// 根据得到的位置对象 设置tooltip的位置
		setComputeToolTipPosition(toolTipPos, appendToBody ,targetEle, tooltipEle);
	}


	render() {
		const { content, theme } = this.props;
		return (
			<div ref={el => {this.tipRef = el}} className={classNames('tooltip', `is-${theme}`)}>
				{ content }
			</div>
		)
	}
}

