import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import './index.less';

const classSelector = `${prefixCls}-card-mate`;

export default function Mate(props) {
    const { className, style, avatar, title, description } = props;
	return (
		<div className={classnames(`${classSelector}`, {[`${classSelector}-avatar`]: avatar}, className)} style={style}>
            {avatar ? <div className={`${classSelector}-avatar`}>{avatar}</div> : null}
            {title || description ? <div className={`${classSelector}-content`}>
                {title ? <div className={`${classSelector}-title`}>{title}</div> : null}
                {description ? <div className={`${classSelector}-description`}>{description}</div> : null}
            </div>: null}
		</div>
	);
}

Mate.propTypes = {
	avatar: PropTypes.element,
	title: PropTypes.element,
	description: PropTypes.element
};
Mate.defaultProps = {
	avatar: '',
	title: '',
	description: ''
};
