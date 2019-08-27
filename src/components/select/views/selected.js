import React, { useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../../icon';

import '../index.less';

const selector = 'select';

export default function Selected(props) {
	const [selectStr, steSelectStr] = useState('');
	const { dataSource, disabled, placeholder, onClick, ...otherProps } = props;

	const classNames = classnames(`${selector}-wrapper`, { disabled, empty: !dataSource.length });

	useEffect(() => {
		if (!dataSource) return;

		const labels = dataSource.map(item => item.label).join(',');
		steSelectStr(labels);
	}, [dataSource]);

	const onWrapperClick = () => {
		if (disabled) return;

		onClick();
	}

	return useMemo(() => (
		<div 
			className={classNames}
			onClick={onWrapperClick}
			{ ...otherProps }>
			<span className={`${selector}-selected`}>
				{ selectStr || placeholder }
			</span>
			<Icon type="down-solid" className={`${selector}-select-icon`} />
		</div>
	), [selectStr, disabled]);
}

Selected.propTypes = {
	disabled: PropTypes.bool,
	dataSource: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	placeholder: PropTypes.string,
	onClick: PropTypes.func
}

Selected.defaultProps = {
	disabled: false,
	dataSource: [],
	placeholder: '',
	onClick: () => {}
} 
