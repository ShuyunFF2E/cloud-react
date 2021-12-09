import React, { Children, cloneElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls, noop } from '@utils';
import StepItem from './item';

import { HORIZONTAL, VERTICAL, INLINE, CIRCLE, DOT, PROCESS, WAIT, FINISH, DEFAULT, SMALL } from './constants';

import './index.less';

export default class Step extends PureComponent {
	static propTypes = {
		current: PropTypes.number,
		direction: PropTypes.oneOf([HORIZONTAL, VERTICAL, INLINE]),
		type: PropTypes.oneOf([CIRCLE, DOT]),
		size: PropTypes.oneOf([DEFAULT, SMALL]),
		children: PropTypes.any,
		onClick: PropTypes.func,
		className: PropTypes.string
	};

	static defaultProps = {
		current: 0,
		direction: HORIZONTAL,
		type: CIRCLE,
		children: null,
		className: '',
		onClick: noop
	};

	static Item = StepItem;

	getStatus(index) {
		const { current } = this.props;

		if (current === index) {
			return PROCESS;
		}

		if (index < current) {
			return FINISH;
		}

		return WAIT;
	}

	render() {
		const { direction, type, size, children, className, onClick: rootClick, ...stepProps } = this.props;
		const classNames = classnames(`${prefixCls}-step`, direction, type, className, size);
		const elements = Children.map(children, (Child, index) => {
			const { status, content, onClick, ...props } = Child.props;

			return cloneElement(Child, {
				...props,
				index,
				status: status || this.getStatus(index),
				onClick: () => {
					onClick(index);
					rootClick(index);
				},
				content: direction === HORIZONTAL ? null : content
			});
		});

		return (
			<div className={classNames} {...stepProps}>
				{elements}
			</div>
		);
	}
}
