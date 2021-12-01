import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

const classSelector = `${prefixCls}-badge`;

export default function Badge(props) {
	const { className, style, mode, type, number } = props;

	const handleBadgeClick = () => {
		props.onClick();
	};

	return (
		<span
			className={classnames(classSelector, `${classSelector}-${mode}`, `${classSelector}-${type}`, className)}
			style={style}
			onClick={handleBadgeClick}>
			{mode === 'message' && (
				<Icon type="remark" className="remark"/>
			)}
			{mode === 'number' && (
				<span className="number-container">{number}</span>
			)}
		</span>
	);
}

Badge.propTypes = {
	mode: PropTypes.oneOf(['message', 'number']),
	type: PropTypes.oneOf(['default', 'success', 'warn', 'fail']),
	number: PropTypes.number,
	onClick: PropTypes.func
};
Badge.defaultProps = {
	mode: 'message',
	type: 'default',
	number: 0,
	onClick: () => {}
};
