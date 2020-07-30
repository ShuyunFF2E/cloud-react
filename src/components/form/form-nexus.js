import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormContext from './context';
import RenderChildren from './render-children';

import { findFieldsName } from './constants';

export default class FormNexus extends Component {
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

	render() {
		const { children } = this.props;

		return <RenderChildren field={this.field}>{children}</RenderChildren>;
	}
}

FormNexus.contextType = FormContext;

FormNexus.propTypes = {
	children: PropTypes.any
};

FormNexus.defaultProps = {
	children: null
};
