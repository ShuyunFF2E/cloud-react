import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from '@utils/omit';

import { prefixCls } from '@utils';

import FormItem from './form-item';
import Nexus from './form-nexus';
import FormContext from './context';
import { LAYOUT_TYPES, LABEL_ALIGN, getParentFormClassName } from './constants';

import './index.less';

const ERROR_SELECTOR = `.${prefixCls}-form-item-explain.error`;
const FORM_ITEM_SELECTOR = `${prefixCls}-form-item`;

export default class Form extends Component {
	static propTypes = {
		field: PropTypes.object,
		colon: PropTypes.bool,
		className: PropTypes.string,
		layout: PropTypes.oneOf([LAYOUT_TYPES.HORIZONTAL, LAYOUT_TYPES.VERTICAL, LAYOUT_TYPES.INLINE]),
		labelAlign: PropTypes.oneOf([LABEL_ALIGN.LEFT, LABEL_ALIGN.RIGHT]),
		labelCol: PropTypes.shape({
			span: PropTypes.number,
			offset: PropTypes.number
		}),
		wrapperCol: PropTypes.shape({
			span: PropTypes.number,
			offset: PropTypes.number
		}),
		scrollToFirstError: PropTypes.bool,
		children: PropTypes.any
	};

	static defaultProps = {
		layout: LAYOUT_TYPES.VERTICAL,
		labelAlign: LABEL_ALIGN.RIGHT,
		colon: true,
		className: '',
		field: {},
		labelCol: {},
		wrapperCol: {},
		children: null,
		scrollToFirstError: false
	};

	static Item = FormItem;

	static Nexus = Nexus;

	componentDidUpdate() {
		const { field, scrollToFirstError } = this.props;

		if (!field.getErrors || !scrollToFirstError) {
			return;
		}

		// TODO：document 后续需要获取Modal.ConfigProvider上的rootDocument来替换
		const firstErrNode = document.querySelector(ERROR_SELECTOR);
		const formItemNode = getParentFormClassName(firstErrNode, FORM_ITEM_SELECTOR);
		const errors = field.getErrors();

		// 没有表单项出现错误，不处理
		if (Object.keys(errors).length === 0 && !firstErrNode) {
			return;
		}

		// 当第一个失败的表单项不在可视区域时则滚动到可视区域
		formItemNode.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest'
		});
	}

	render() {
		const { children, colon, field, layout, labelCol, wrapperCol, labelAlign, className, ...others } = this.props;
		const props = omit(others, ['scrollToFirstError']);
		const classNames = classnames(`${prefixCls}-form`, className);

		return (
			<FormContext.Provider value={{ colon, field, layout, labelAlign, labelCol, wrapperCol }}>
				<form {...props} className={classNames}>
					{children}
				</form>
			</FormContext.Provider>
		);
	}
}
