import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../index.less';

const selector = 'select';

export default function Option(props) {
	const { onChange, disabled, isSelected, className, ...otherProps } = props;

	const onOptionClick = () => {
		if (disabled) return;

		onChange(props);
	}
	const classNames = classnames(`${selector}-option`, { disabled, selected: isSelected }, className);

	return useMemo(() => (
		<div {...otherProps} onClick={onOptionClick} className={classNames} />
	), [isSelected]);
}

Option.propTypes = {
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	className: PropTypes.string,
	onChange: PropTypes.func
}

Option.defaultProps = {
	disabled: false,
	value: '',
	className: '',
	onChange: () => {}
}