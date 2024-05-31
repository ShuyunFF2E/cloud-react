import { prefixCls } from '@utils';

export const tablePrefixCls = `${prefixCls}-table`;

export const DRAG_SELECTOR = `.${tablePrefixCls}-row`;

export const DRAG_ICON_SELECTOR = `.${tablePrefixCls}-drag-column`;

export const NUMBER = 'NUMBER'; // 数字类型
export const TIME = 'TIME'; // 时间类型
export const TIME_RANGE = 'TIME_RANGE'; // 时间范围类型
export const TEXT = 'TEXT'; // 单行文本
export const MULTI_TEXT = 'MULTI_TEXT'; // 多行文本：该字段已废弃
export const LINK = 'LINK'; // 单行文本带链接
export const MULTI_LINK = 'MULTI_LINK'; // 多行链接：该字段已废弃
export const TAG = 'TAG'; // 标签形式
