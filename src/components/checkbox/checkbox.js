import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.less';
import { GroupContext } from './group';

function CommonCheckbox(props, ref) {

	const {
		value,
		style,
		checked,
		disabled,
		children,
		onChange,
		className,
		classSelector,
		...other
	} = props;

	const render = ctx => {

		const groupProps = ctx === null
			? { checked, onChange, disabled }
			: {
				disabled: ctx.disabled,
				checked: ctx.checkedList.has(value),
				onChange(evt) {
					onChange(evt);
					ctx.onChange(evt);
				}
			};

		return (
			<label className={classnames(classSelector, className)} style={style}>
				<input
					{...other}
					value={value}
					type='checkbox'
					ref={ref}
					{...groupProps}
					className={`${classSelector}-input`}
				/>
				<span className={`${classSelector}-inner`} />
				<span className={`${classSelector}-container`}>{ children }</span>
			</label>
		)
	};

	return <GroupContext.Consumer>{ render }</GroupContext.Consumer>
}


const Checkbox = forwardRef(CommonCheckbox);

Checkbox.propTypes = {
	value: PropTypes.node.isRequired,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

Checkbox.defaultProps = {
	checked: false,
	disabled: false,
	onChange: () => {}
};

export default Checkbox;
