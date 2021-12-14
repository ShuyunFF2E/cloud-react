import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Mate from './mate';
import './index.less';

const classSelector = `${prefixCls}-card`;

export default function Card(props) {
	const { className, style, children, title, extra, action, cover } = props;

	const renderHeader = () => {
		if (!title && !extra && !cover) {
			return null;
		}
		if (cover) {
			return <div className={`${classSelector}-cover`}>
				{cover}
			</div>
		}
		return (
			<div className={`${classSelector}-header`}>
				{title && <div className={`${classSelector}-title`}>{title}</div>}
				{extra && <div className={`${classSelector}-extra`}>{extra}</div>}
			</div>
		);
	}
	return (
		<div className={classnames(`${classSelector}`, className)} style={style}>
			{renderHeader()}
			<div className={`${classSelector}-content`}>{children}</div>
			{action ? <div className={`${classSelector}-action`}>
				{action}
			</div> : null}
		</div>
	);
}
Card.Mate = Mate;
Card.propTypes = {
	title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	cover: PropTypes.element,
	action: PropTypes.element
};
Card.defaultProps = {
	title: null,
	extra: null,
	cover: null,
	action: null
};
