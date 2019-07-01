import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.less';

function CommonCheckbox(props) {

	const checkboxRef = useRef(null);
	const {
		value,
		style,
		checked,
		disabled,
		children,
		onChange,
		className,
		classSelector,
		indeterminate,
		...other
	} = props;

	useEffect(() => {
		checkboxRef.current.indeterminate = indeterminate;
	});

	return (
		<label className={classnames(classSelector, className)} style={style}>
			<input
				{...other}
				value={value}
				type='checkbox'
				checked={checked}
				ref={checkboxRef}
				onChange={onChange}
				disabled={disabled}
				className={`${classSelector}-input`}
			/>
			<span className={`${classSelector}-inner`} />
			<span className={`${classSelector}-container`}>{ children }</span>
		</label>
	)
}

CommonCheckbox.propTypes = {
	value: PropTypes.node.isRequired,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

CommonCheckbox.defaultProps = {
	checked: false,
	disabled: false,
	onChange: () => {}
};


export default CommonCheckbox;
