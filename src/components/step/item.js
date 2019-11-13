import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils/config';

import Icon from '../icon';

import { WAIT, FINISH, PROCESS } from './constants';

export default class StepItem extends React.Component {

	static propTypes = {
		status: PropTypes.oneOf([WAIT, PROCESS, FINISH]),
		title: PropTypes.any,
		content: PropTypes.any,
		index: PropTypes.number,
		onClick: PropTypes.func,
		className: PropTypes.string
	};

	static defaultProps = {
		status: null,
		title: null,
		content: null,
		index: null,
		className: '',
		onClick: () => {}
	};

	render() {

		const { index, status, title, content, className, onClick } = this.props;
		const iconNumber = index + 1;

		return (
			<div className={classnames(`${prefixCls}-step-item`, status, className)}>

				<div className={classnames(`${prefixCls}-step-icon`, status)} onClick={onClick}>
					{status === FINISH ? <Icon type="finish" /> : <span>{iconNumber}</span>}
				</div>

				<div className={classnames(`${prefixCls}-step-body`)}>
					{/* title */}
					<div className={classnames(`${prefixCls}-step-title`)}>{title}</div>

					{/* content */}
					{
						content &&
						<div className={classnames(`${prefixCls}-step-content`)}>{content}</div>
					}
				</div>

			</div>
		);
	}
}
