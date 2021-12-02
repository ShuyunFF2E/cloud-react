import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { prefixCls } from '@utils';
import './index.less';

const classSelector = `${prefixCls}-progress`;

export default function Progress(props) {
	const { type, size, percent, showPercent, iconTpl, color, className, style } = props;
	const showInfo = size === 'middle' || size === 'large';

	const relativeStrokeWidth = {
		small: 12,
		middle: 6,
		large: 6
	}[size];

	const trackPath = () => {
		const radius = parseInt(String(50 - relativeStrokeWidth / 2), 10);
		return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
	};

	const getPerimeter = () => {
		const radius = 50 - parseFloat(relativeStrokeWidth) / 2;
		return 2 * Math.PI * radius;
	};

	const circlePathStyle = () => {
		const perimeter = getPerimeter();
		return {
			stroke: color,
			strokeDasharray: `${perimeter}px,${perimeter}px`,
			strokeDashoffset: `${(1 - percent / 100) * perimeter}px`,
			transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
		};
	};

	const progressInfo = showInfo && (
		<div className={`${classSelector}-${type}-info`}>
			{showPercent && <span className="percent">{percent}%</span>}
			{iconTpl && (
				<span className="icon" style={{ color }}>
					{iconTpl}
				</span>
			)}
		</div>
	);

	let progress = null;

	if (type === 'line') {
		progress = (
			<div className={`${classSelector}-line-container`}>
				<div className={`${classSelector}-line-percent-container`}>
					<div className={`${classSelector}-line-percent`} style={{ width: `${percent}%`, background: color }} />
				</div>
				{progressInfo}
			</div>
		);
	}

	if (type === 'circle') {
		progress = (
			<div className={`${classSelector}-circle`}>
				<svg viewBox="0 0 100 100">
					<path className={`${classSelector}-circle-track`} d={trackPath()} strokeWidth={relativeStrokeWidth} fill="none" />
					<path
						className={`${classSelector}-circle-path`}
						d={trackPath()}
						strokeLinecap="round"
						strokeWidth={relativeStrokeWidth}
						fill="none"
						style={circlePathStyle()}
					/>
				</svg>
				{progressInfo}
			</div>
		);
	}

	return (
		<section className={classnames(classSelector, `${classSelector}-${type}`, `${classSelector}-${size}`, className)} style={style}>
			{progress}
		</section>
	);
}
Progress.propTypes = {
	type: PropTypes.oneOf(['line', 'circle']),
	size: PropTypes.oneOf(['small', 'middle', 'large']),
	color: PropTypes.string,
	percent: PropTypes.number,
	showPercent: PropTypes.bool,
	iconTpl: PropTypes.any
};
Progress.defaultProps = {
	type: 'line',
	size: 'middle',
	color: '',
	percent: 0,
	showPercent: false,
	iconTpl: ''
};
