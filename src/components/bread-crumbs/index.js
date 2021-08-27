import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.less';

export default function BreadCrumbs(props) {
	const { className, styles, list, onClick, size } = props;
	return (
		<ul className={classnames('cloud-breadcrumbs', `cloud-breadcrumbs-${size}`, className)} style={styles}>
			{list.map(item => (
				// eslint-disable-next-line
				<li key={item.key} onClick={() => onClick(item)}>
					{item.title}
				</li>
			))}
		</ul>
	);
}
BreadCrumbs.propTypes = {
	list: PropTypes.array,
	onClick: PropTypes.func,
	size: PropTypes.oneOf(['small', 'default', 'large']),
	styles: PropTypes.object
};
BreadCrumbs.defaultProps = {
	list: [],
	onClick: () => {},
	size: 'default',
	styles: {}
};
