import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from '../../icon';
import enumObj from '../util/enum';
import utils from '../util';

const defaultYear = utils.time.current().getFullYear();

function YearRegionHeader(props) {
	const { min, max, region } = props;

	function onChange(params) {
		if (params === enumObj.left) {
			if (region[0] <= min) {
				return;
			}
		} else if (params === enumObj.right) {
			if (region[1] >= max) {
				return;
			}
		}
		props.onChange(params);
	}

	function getDisabled(params) {
		if(params === enumObj.left) {
			return region[0] <= min;
		}
		if(params === enumObj.right) {
			return region[1] >= max;
		}
		return false;
	}

	const arrowLeftClass = cls('arrow-left', {
		'arrow-disabled': getDisabled(enumObj.left)
	});
	const arrowRightClass = cls('arrow-right', {
		'arrow-disabled': getDisabled(enumObj.right)
	});

	return (
		<div className="header">
			<span className={arrowLeftClass} onClick={() => onChange(enumObj.left)}>
				<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
			</span>
			<label>{region[0]}年</label>
			<i> - </i>
			<label>{region[1]}年</label>
			<span className={arrowRightClass} onClick={() => onChange(enumObj.right)}>
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
