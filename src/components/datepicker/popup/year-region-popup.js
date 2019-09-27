import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YearRegionHeader from '../header/year-region-header';
import YearGrid from '../grid/year-grid';
import enumObj from '../util/enum';
import { selector } from '../util/view-common';

const currentYear = new Date().getFullYear();
function Popup(props) {
    const { left, top, min, max, className, checkValue, showThisYear, onChange } = props;

	function getInitRegion() {
		const maxYear = parseInt(max, 10);
		const minYear = parseInt(min, 10);
		const year = checkValue || currentYear;
		if (year + 7 <= maxYear || year - 7 >= minYear) {
			return [year - 7, year + 7];
		}
		if (year + 7 > maxYear) {
			return [maxYear - 14, maxYear];
		}
		return [minYear, minYear + 14];
	}

    const [region, setRegion] = useState(getInitRegion());

    function onHeaderChange(params) {
        if (params === enumObj.left) {
            setRegion([region[0] - 15, region[0] - 1]);
        } else if (params === enumObj.right) {
            setRegion([region[1] + 1, region[1] + 15]);
        }
    }

    function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
    }

	return (
        <div className={`${selector}-popup ${className}`} style={{ left, top }} onClick={popClick}>
            <YearRegionHeader
				min={min}
				max={max}
				region={region}
				onChange={onHeaderChange} />
            <YearGrid
				min={min}
				max={max}
				showThisYear={showThisYear}
				minRegion={region[0]}
				maxRegion={region[1]}
				checkValue={checkValue}
				onChange={(value) => onChange(value)} />
        </div>
	);
}


Popup.propTypes = {
	className: PropTypes.string,
    left: PropTypes.number,
    top: PropTypes.number,
    min: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    max: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
	showThisYear: PropTypes.bool,
    checkValue: PropTypes.number,
	onChange: PropTypes.func
}

Popup.defaultProps = {
	className: '',
	left: 0,
	top: 0,
	min: undefined,
	max: undefined,
	showThisYear: false,
	checkValue: currentYear,
	onChange: () => { }
}

export default Popup;
