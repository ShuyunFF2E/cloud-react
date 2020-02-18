import React from 'react';
import ReactDOM from 'react-dom';
import { prefixCls } from '@utils/config';

import Icon from '../../icon';
import enumObj from './enum';

const container = {};

export const selector = `${prefixCls}-datepicker`;
export const timeSelector = `${prefixCls}-timepicker`;
export const rangeSelector = `${prefixCls}-rangepicker`;

export const calendarIcon = <Icon type="calendar" className={`${selector}-inp-icon`}></Icon>;
// 根据实例id创建日历面板弹层
export function createWrapper(id) {
	container[id] = document.createElement('div');
	container[id].id = id;
	container[id].className = `${selector}-container`;
	container[id].style.position = 'absolute';
	container[id].style.left = 0;
	container[id].style.top = 0;
	container[id].style.width = '100%';
}
// 渲染DOM
export function renderDOM(id, component) {
	const wrapper = container[id];
	document.body.appendChild(wrapper);
	ReactDOM.render(component, wrapper);
}
// 释放DOM
export function destroyDOM(id, callback) {
	const wrapper = container[id];
	if (wrapper) {
		ReactDOM.unmountComponentAtNode(wrapper);
		document.body.removeChild(wrapper);
		delete container[id];
	}
	if (callback) {
		callback();
	}
}

export function destroyAllDOM() {
	const dpArr = document.getElementsByClassName(`${selector}-container`);
	const len = dpArr.length;
	for(let i = 0;i < len;) {
		destroyDOM(dpArr[i].id);
		i += 1;
	}
}

export function isVaild(value) {
	return value !== undefined && value !== null;
}

export const datepickerUI = {
	// 年月日视图
	HEIGHT_DEFAULT: 262,
	// 年月日时分秒视图
	HEIGHT_TIME: 313,
	// 年视图
	HEIGHT_YEAR: 244,
	// 月视图
	HEIGHT_MONTH: 211,
	// 月日视图
	HEIGHT_MONTH_DAY: 262
};

export function formatZero(value) {
	return parseInt(value, 10) < 10 ? `0${parseInt(value, 10)}` : value;
}

export function getWinHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

export function getScrollTop() {
	return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
}

export function getAvailHeight() {
	return document.body.clientHeight;
}
// 根据位置计算坐标
export function getPositionByComp({ left, bottom, top }, position, HEIGHT) {
	let _top = 0;
	switch (position) {
		case enumObj.AUTO:
			_top = getAvailHeight() - bottom > HEIGHT ? (bottom +  getScrollTop()) : (top + getScrollTop() - HEIGHT);
			break;
		case enumObj.UP:
			_top = top + getScrollTop() - HEIGHT;
			break;
		case enumObj.DOWN:
		default:
			_top = bottom + getScrollTop();
			break;
	}

	return {
		left,
		top: _top
	}
}

export function formatNumber(data) {

	const stringValue = data.trim().replace(/[^\d]/g, '');
	const numberValue = parseInt(data.trim().replace(/[^\d]/g, ''), 10);

	return { numberValue, stringValue, length: stringValue.length };
}
