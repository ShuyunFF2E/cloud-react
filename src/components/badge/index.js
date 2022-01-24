import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

const classSelector = `${prefixCls}-badge`;

export default function Badge(props) {
	const { className, style, mode, type, number, text } = props;

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
      {mode === 'dot' && (
        <span className="text">{text}</span>
      )}
		</span>
	);
}

Badge.propTypes = {
	mode: PropTypes.oneOf(['message', 'number', 'dot']),
	type: PropTypes.oneOf(['default', 'success', 'warn', 'fail', 'finish']),
	number: PropTypes.number,
  text: PropTypes.string,
	onClick: PropTypes.func
};
Badge.defaultProps = {
	mode: 'message',
	type: 'default',
	number: 0,
  text: '',
	onClick: () => {}
};
