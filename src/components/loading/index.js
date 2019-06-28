import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./index.less";

const sizeMap = {
	small: 13,
	large: 23,
	default: 18
};

function SvgLoading(props) {
	const { size, tip, layer } = props;
	const loadingType = classNames("loading-container", {
		"loading-layer": layer
	});
	const loadingAnimation = classNames("loading-animation", {
		"loading-tip-animation": tip
	});
	return (
		<div className={loadingType}>
			<div className={loadingAnimation}>
				<svg className="circular" viewBox="25 25 50 50">
					<circle className="path" cx="50" cy="50" r={sizeMap[size]}/>
				</svg>
			</div>
			{tip && <div className="loading-text">{tip}</div>}
		</div>
	);
}

function Loading(props) {
	const { loading, delay, layer, size, tip, children } = props;
	const [delayShow, setDelayShow] = useState(delay <= 0);

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
			<div className="loading">
				{children}
				{loading && delayShow && <SvgLoading size={size} tip={tip} layer={layer}/>}
			</div>
			:
			(
				loading && delayShow &&
				<div className="loading">
					<SvgLoading size={size} tip={tip} layer={layer}/>
				</div>
			)
	);
}


Loading.propTypes = {
	loading: PropTypes.bool,
	layer: PropTypes.bool,
	size: PropTypes.oneOf(["default", "small", "large"]),
	tip: PropTypes.string,
	delay: PropTypes.number
};

Loading.defaultProps = {
	loading: true,
	layer: false,
	size: "default",
	tip: "",
	delay: 0
};

export default Loading;
