import React, { useEffect, useState, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function Group(props) {

	const { children, value, disabled, onChange, className, ...other } = props;
	const [checkedList, setCheckList] = useState(new Set(value));

	useEffect(() => {
		setCheckList(new Set(value));
	}, [value]);

	const onChangeAction = evt => {
		const { target: { checked, value: targetValue } } = evt;

		checkedList[checked ? 'add' : 'delete'](targetValue);
		onChange([...checkedList]);
		setCheckList(new Set(checkedList));
	};

	return (
		<span className={classnames('checkbox-group', className)} {...other}>
			{
				Children.map(children, child => cloneElement(child, {
					disabled,
					checked: checkedList.has(child.props.value),
					onChange: onChangeAction
				}))
			}
		</span>
	)
}

Group.propTypes = {
	value: PropTypes.array,
	disabled: PropTypes.bool,
	onChange: PropTypes.func
};

Group.defaultProps = {
	value: [],
	disabled: false,
	onChange: () => {}
};

export default Group;

