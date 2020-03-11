import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { prefixCls } from '@utils/config';
import './index.less';

const Toggle = props => {
	const { checked, checkedText, unCheckedText, size, disabled, onChange, onBeforeChange } = props;

	const prefix = `${prefixCls}-toggle`;

	const wrapper = classNames(prefix, {
		[`${prefix}-small`]: size === 'small',
		[`${prefix}-checked`]: checked,
		[`${prefix}-disabled`]: disabled
	});

	const handleClick = event => {
		if (disabled) {
			return;
		}

		if (onBeforeChange) {
			onBeforeChange();
			return;
		}

		if (onChange) {
			onChange(!checked, event);
		}
	};

	return (
		<button type="button" className={wrapper} onClick={handleClick}>
			<span className={`${prefix}-inner`}>{checked ? checkedText : unCheckedText}</span>
		</button>
	);
};

Toggle.propTypes = {
	size: PropTypes.oneOf(['default', 'small']),
	checked: PropTypes.bool,
	checkedText: PropTypes.string,
	unCheckedText: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

Toggle.defaultProps = {
	size: 'default',
	checked: false,
	checkedText: '',
	unCheckedText: '',
	disabled: false,
	onChange: () => {}
};

export default Toggle;
