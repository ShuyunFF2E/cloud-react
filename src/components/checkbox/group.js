import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const GroupContext = React.createContext(null);

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

	const provider = {
		disabled,
		checkedList,
		onChange: onChangeAction
	};

	return (
		<GroupContext.Provider value={provider}>
			<span className={classnames('checkbox-group', className)} {...other}>
				{ children }
			</span>
		</GroupContext.Provider>
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

