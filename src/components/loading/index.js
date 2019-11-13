import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefixCls } from '@utils/config';

import './index.less';

const sizeMap = {
	small: 13,
	large: 23,
	default: 18
};

const selector = `${prefixCls}-loading`;

function SvgLoading(props) {
	const { size, tip, layer } = props;
	const loadingType = classNames(`${selector}-container`, {
		[`${selector}-layer`]: layer
	});
	const loadingAnimation = classNames(`${selector}-animation`, {
		[`${selector}-tip-animation`]: tip
	});
	return (
		<div className={loadingType}>
			<div className={loadingAnimation}>
				<svg className="circular" viewBox="25 25 50 50">
					<circle className="path" cx="50" cy="50" r={sizeMap[size]}/>
				</svg>
			</div>
			{tip && <div className={classNames(`${selector}-text`)}>{tip}</div>}
		</div>
	);
}

function Loading(props) {

	const { loading, delay, layer, size, tip, children } = props;
	const [delayShow, setDelayShow] = useState(delay <= 0);
	const classes = classNames(selector);

	useEffect(() => {
		let timer;
		if (delay > 0) {
			if (loading) {
				timer = setTimeout(() => {
					setDelayShow(true);
				}, delay);
			} else {
				setDelayShow(false);
			}
		}

		return () => {
			if (timer) { clearTimeout(timer); }
		}
	}, [delay, loading]);

	return (
		children ?
			<div className={classes}>
				{children}
				{loading && delayShow && <SvgLoading size={size} tip={tip} layer={layer}/>}
			</div>
			:
			(
				loading && delayShow &&
				<div className={classes}>
					<SvgLoading size={size} tip={tip} layer={layer}/>
				</div>
			)
	);
}


Loading.propTypes = {
	loading: PropTypes.bool,
	layer: PropTypes.bool,
	size: PropTypes.oneOf(['default', 'small', 'large']),
	tip: PropTypes.string,
	delay: PropTypes.number
};

Loading.defaultProps = {
	loading: true,
	layer: false,
	size: 'default',
	tip: '',
	delay: 0
};

export default Loading;
