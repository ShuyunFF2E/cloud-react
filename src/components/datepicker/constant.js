import React from 'react';
import { prefixCls } from '@utils';
import Icon from '../icon';

export const selectorClass = `${prefixCls}-datepicker`;
export const timeSelectorClass = `${prefixCls}-timepicker`;
export const rangeSelectorClass = `${prefixCls}-rangepicker`;
export const containerClass = `${selectorClass}-container`;

export const calendarIcon = <Icon type="calendar" className={`${selectorClass}-inp-icon`}></Icon>;

export const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
export const miniWeek = ['日', '一', '二', '三', '四', '五', '六'];

export const enumObj = {
	YEAR: 'YEAR',
	MONTH: 'MONTH',
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	HOUR: 'HOUR',
	MINUTE: 'MINUTE',
	SECOND: 'SECOND',

	YEAR_MODEL: 'YEAR_MODEL',
	YEAR_MONTH_MODEL: 'YEAR_MONTH_MODEL',
	MONTH_MODEL: 'MONTH_MODEL',
	MONTH_DAY_MODEL: 'MONTH_DAY_MODEL',
	ALL_MODEL: 'ALL_MODEL',

	AUTO: 'AUTO',
	UP: 'UP',
	DOWN: 'DOWN',

	START: 'START',
	END: 'END',

	DATE_HOUR: 'DATE_HOUR',
	DATE_HOUR_MINUTE: 'DATE_HOUR_MINUTE',
	DATE_TIME: 'DATE_TIME'
};
