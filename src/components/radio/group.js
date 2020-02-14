import React, { Children, cloneElement, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';
/* eslint-disable-next-line */
import Radio from './index';

const noop = () => {};
const classSelector = `${prefixCls}-radio`;

export default function Group(props) {

	const { children, defaultValue, value, onChange, disabled, horizontal, vertical } = props;
	const [currentValue, setCurrentValue] = useState(defaultValue);

	useEffect(() => {
		setCurrentValue(value === undefined ? defaultValue : value);
	}, [value]);

	function renderChild(childs) {
		// 子元素有可能为一个表达式，直接返回了false或者null
		const _childs = Array.from(childs).filter(child => Boolean(child));

		return Children.map(_childs, child => {

			if (child.type && child.type.prototype === Radio.prototype) {
				return cloneElement(child, {
					disabled,
					checked: child.props.value === currentValue,
					onChange(val, evt) {
						setCurrentValue(val);
						onChange(val, evt);
					}
				});
			}

			if (child.props && child.props.children) {
				return cloneElement(child, {
					...child.props,
					children: renderChild(child.props.children)
				});
			}
			return child;
		});
	}

	const radios = useMemo(() => renderChild(children), [currentValue, disabled]);

	return (
		<span className={classnames(`${classSelector}-group`, { horizontal, vertical })}>
			{ radios }
		</span>
	)
}

Group.propTypes = {
	defaultValue: PropTypes.node,
	value: PropTypes.node,
	onChange: PropTypes.func,
	disabled: PropTypes.bool
};

Group.defaultProps = {
	defaultValue: undefined,
	value: undefined,
	onChange: noop,
	disabled: false
};
