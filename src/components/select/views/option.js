import React, { useMemo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Checkbox from '../../checkbox';
import { selector } from './common';

import '../index.less';

export default function Option(props) {
	const { disabled, isSelected, multiple, className, onChange, isSupportTitle, ...otherProps } = props;

	const onOptionClick = () => {
		if (disabled) return;

		onChange(props);
	};
	const classNames = classnames(`${selector}-option`, { disabled, selected: isSelected }, className);

	if (multiple) {
		const { value, children } = otherProps;
		return (
			<label className={classnames(classNames, `${selector}-multi-option`)}>
				<Checkbox checked={isSelected} disabled={disabled} value={value} onChange={onChange} />
				<span title={children}>{children}</span>
			</label>
		);
	}

	const { children, ...others } = otherProps;
	const title = Array.isArray(children) ? children.filter(item => typeof item === 'string').join('') : children;
	return useMemo(
		() => (
			<div {...others} onClick={onOptionClick} className={classNames}>
				{isSupportTitle ? <span title={title}>{children}</span> : <span>{children}</span>}
			</div>
		),
		[isSelected]
	);
}

Option.propTypes = {
	disabled: PropTypes.bool,
	isSupportTitle: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	onChange: PropTypes.func
};

Option.defaultProps = {
	disabled: false,
	isSupportTitle: false,
	value: '',
	className: '',
	onChange: noop
};
