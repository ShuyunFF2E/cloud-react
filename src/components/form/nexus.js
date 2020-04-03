import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormContext from './context';
import Explain from './explain';

import { DATA_FIELD, findFieldsName } from './constants';

const noop = () => {};

export default class FormB extends Component {
	static contextType = FormContext;

	static propTypes = {
		children: PropTypes.any
	};

	static defaultProps = {
		children: null
	};

	componentWillUnmount() {
		const { field, dataFields } = this;

		// 如果设置了校验规则，则重置并删除
		if (field && field.remove && dataFields && dataFields.length) {
			field.remove(dataFields);
		}
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

	get dataFields() {
		const {
			field,
			props: { children }
		} = this;
		const fieldsName = findFieldsName(children);

		if (field && field.fieldsMeta && fieldsName.length) {
			return fieldsName;
		}

		return null;
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
						})}>
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
		const { children } = this.props;

		return this.renderChildren(children);
	}
}
