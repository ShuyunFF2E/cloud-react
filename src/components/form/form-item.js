import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';

import FormContext from './context';
import { LAYOUT_TYPES } from './constants';

const MAX_COL = 24;
const DATA_FIELD = 'data-field';
const noop = () => {};

export default class Form extends Component {

	static contextType = FormContext;

	static propTypes = {
		help: PropTypes.node,
		label: PropTypes.node,
		htmlFor: PropTypes.string,
		required: PropTypes.bool,
		className: PropTypes.string,
		labelCol: PropTypes.shape({
			span: PropTypes.number,
			offset: PropTypes.number
		}),
		wrapperCol: PropTypes.shape({
			span: PropTypes.number,
			offset: PropTypes.number
		}),
		children: PropTypes.any
	};

	static defaultProps = {
		help: null,
		label: '',
		className: '',
		htmlFor: undefined,
		required: undefined,
		labelCol: undefined,
		wrapperCol: undefined,
		children: null
	};

	componentWillUnmount() {
		const { field, dataField } = this;

		// 如果设置了校验规则，则重置并删除
		if (field && field.remove && dataField) {
			field.remove(dataField);
		}
	}

	get labelColSpan() {
		const { labelCol: formLabelCol, layout } = this.context;
		const { labelCol = formLabelCol } = this.props;
		const { span = layout === LAYOUT_TYPES.HORIZONTAL ? 3 : undefined } = labelCol;

		return span;
	}

	get field() {
		return this.context.field;
	}

	get fieldsMeta() {
		if (this.field && this.field.fieldsMeta) {
			return this.field.fieldsMeta;
		}
		return null;
	}

	get required() {
		const { fieldsMeta, dataField, props: { required } } = this;

		if (required !== undefined) {
			return required;
		}

		if (fieldsMeta && dataField) {
			const { rules = [] } = fieldsMeta[dataField];

			return rules.some(rule => rule.required);
		}

		return false;
	}

	renderLabel() {
		const { labelColSpan, required } = this;
		const { colon, layout, labelCol: formLabelCol } = this.context;
		const { label, htmlFor, labelCol = formLabelCol } = this.props;
		const { offset } = labelCol;

		const labelAttrs = {
			htmlFor,
			required,
			className: classnames(`${prefixCls}-form-item-label`, {
				'has-colon': colon,
				[`col-${labelColSpan}`]: (
					labelColSpan !== undefined &&
					layout !== LAYOUT_TYPES.VERTICAL
				),
				[`col-offset-${offset}`]: offset !== undefined
			})
		};

		return label && <label {...labelAttrs}>{label}</label>;
	}

	renderWrapper() {
		const { labelColSpan } = this;
		const { wrapperCol: formWrapperCol, layout } = this.context;
		const { children, help, wrapperCol = formWrapperCol } = this.props;
		const { span = labelColSpan !== undefined ? MAX_COL - labelColSpan : undefined, offset } = wrapperCol;

		const wrapperAttrs = {
			className: classnames(`${prefixCls}-form-item-wrapper`, {
				[`col-${span}`]: (
					span !== undefined &&
					layout !== LAYOUT_TYPES.VERTICAL
				),
				[`col-offset-${offset}`]: offset !== undefined
			})
		};

		return (
			<div {...wrapperAttrs}>
				{this.renderChildren(children)}
				{<Explain>{help}</Explain>}
			</div>
		);
	}

	renderChildren(children) {

		if (['object', 'string', 'array'].indexOf(typeof children) === -1) {
			return children;
		}

		return Children.map(children, (child, key) => {
			if (!child) return null;

			const { props } = child;

			if (!props) return child;

			if (props && props[DATA_FIELD]) {
				const { getState = noop, getError = noop } = this.field || {};

				const state = getState.call(this.field, props[DATA_FIELD]);
				const error = getError.call(this.field, props[DATA_FIELD]);

				return (
					<div
						key={key.toString()}
						className={classnames('contents', {
							'has-error': state === 'error',
							'has-success': state === 'success'
						})}
					>
						{cloneElement(child, child.props)}
						{error ? <Explain className="error">{error}</Explain> : null}
					</div>
				);
			}

			let items = props.children;

			if (props.children && Children.count(props.children) && !props[DATA_FIELD]) {
				items = this.renderChildren(props.children);
			}

			return cloneElement(child, { key, ...child.props, children: items });
		});
	}

	render() {
		const { layout, labelAlign } = this.context;
		const { props: { className } } = this;

		return (
			<div className={classnames(`${prefixCls}-form-item`, layout, labelAlign, className)}>
				{this.renderLabel()}
				{this.renderWrapper()}
			</div>
		);
	}
}

function Explain({ children, className }) {
	return children && (
		<div className={classnames(`${prefixCls}-form-item-explain`, className)}>{children}</div>
	);
}
