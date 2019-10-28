import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from '../../icon';
import enumObj from '../util/enum';

const defaultYear = new Date().getFullYear();

function YearRegionHeader(props) {
	const { min, max, region } = props;

	function onChange(params) {
		if (params === enumObj.LEFT) {
			if (region[0] <= min) {
				return;
			}
		} else if (params === enumObj.RIGHT) {
			if (region[1] >= max) {
				return;
			}
		}
		props.onChange(params);
	}

	function getDisabled(params) {
		if(params === enumObj.LEFT) {
			return region[0] <= min;
		}
		if(params === enumObj.RIGHT) {
			return region[1] >= max;
		}
		return false;
	}

	const arrowLeftClass = cls('arrow-left', {
		'arrow-disabled': getDisabled(enumObj.LEFT)
	});
	const arrowRightClass = cls('arrow-right', {
		'arrow-disabled': getDisabled(enumObj.RIGHT)
	});

	return (
		<div className="header">
			<span className={arrowLeftClass} onClick={() => onChange(enumObj.LEFT)}>
				<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
			<label>{region[0]}年</label>
			<i> - </i>
			<label>{region[1]}年</label>
			<span className={arrowRightClass} onClick={() => onChange(enumObj.RIGHT)}>
				<Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
		</div>
	);
}

YearRegionHeader.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	region: PropTypes.arrayOf(PropTypes.number),
	onChange: PropTypes.func
}

YearRegionHeader.defaultProps = {
	min: undefined,
	max: undefined,
	region: [defaultYear, defaultYear],
	onChange: () => { }
}

export default YearRegionHeader;
