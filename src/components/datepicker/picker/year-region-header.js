import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from '../common/arrow';

const defaultYear = new Date().getFullYear();

const YearRegionHeader = props => {
	const { min, max, region, onChange } = props;

	const handleLeftClick = params => {
		if (region[0] <= min) {
			return;
		}
		onChange(params);
	};

	const handleRightClick = params => {
		if (region[1] >= max) {
			return;
		}
		onChange(params);
	};

	return (
		<div className="header">
			<ArrowLeft onClick={handleLeftClick} disabled={region[0] <= min} />
			<label>{region[0]}年</label>
			<i> - </i>
			<label>{region[1]}年</label>
			<ArrowRight onClick={handleRightClick} disabled={region[1] >= max} />
		</div>
	);
};

YearRegionHeader.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	region: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func
};

YearRegionHeader.defaultProps = {
	min: undefined,
	max: undefined,
	region: [defaultYear, defaultYear],
	onChange: () => {}
};

export default YearRegionHeader;
