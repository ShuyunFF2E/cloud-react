import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import Icon from '../icon';
import './index.less';

const classSelector = `${prefixCls}-breadcrumbs`;
const SHOW_MORE_NUM = 5;

export default function BreadCrumbs(props) {
	const { className, styles, list, onClick, size, split } = props;

	const [actualList, setActualList] = useState(list);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const isShowMore = list.length >= SHOW_MORE_NUM;
		setShowMore(isShowMore);

		if (isShowMore) {
			setActualList([list[0], ...list.slice(-2)]);
		}
	}, [list]);

	const onShowMoreClick = () => {
		setShowMore(false);
		setActualList(list);
	};

	const splitWrap = <span className="split">{split}</span>;

	return (
		<ul className={classnames(classSelector, `${classSelector}-${size}`, className)} style={styles}>
			{actualList.map((item, index) => (
				// eslint-disable-next-line
				<li key={item.key}>
					<span className="title" onClick={() => onClick(item)}>
						{item.iconTpl || (item.icon && <Icon type={item.icon} />)}
						{item.title}
					</span>
					{index !== actualList.length - 1 && splitWrap}
					{showMore && index === 0 && (
						<>
							<span className="more" onClick={onShowMoreClick}>
								...
							</span>
							<span>{splitWrap}</span>
						</>
					)}
				</li>
			))}
		</ul>
	);
}
BreadCrumbs.propTypes = {
	split: PropTypes.string,
	list: PropTypes.array,
	onClick: PropTypes.func,
	size: PropTypes.oneOf(['small', 'default', 'large']),
	styles: PropTypes.object
};
BreadCrumbs.defaultProps = {
	split: '/',
	list: [],
	onClick: () => {},
	size: 'default',
	styles: {}
};
