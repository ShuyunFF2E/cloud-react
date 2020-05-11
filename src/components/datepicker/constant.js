import { prefixCls } from '@utils';

export const selectorClass = `${prefixCls}-datepicker`;
export const timeSelectorClass = `${prefixCls}-timepicker`;
export const rangeSelectorClass = `${prefixCls}-rangepicker`;
export const containerClass = `${selectorClass}-container`;

export const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export const enumObj = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',

	YEAR_MODEL: 'YEAR_MODEL',
	YEAR_MONTH_MODEL: 'YEAR_MONTH_MODEL',
	MONTH_MODEL: 'MONTH_MODEL',
	MONTH_DAY_MODEL: 'MONTH_DAY_MODEL',

	DATE_MODEL: 'DATE_MODEL',
	DATE_TIME_MODEL: 'DATE_TIME_MODEL',

	AUTO: 'AUTO',
	UP: 'UP',
	DOWN: 'DOWN'
};
