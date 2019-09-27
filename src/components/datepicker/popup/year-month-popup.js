import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YearRegionHeader from '../header/year-region-header';
import YearGrid from '../grid/year-grid';
import YearMonthHeader from '../header/year-month-header';
import MonthGrid from '../grid/month-grid';
import enumObj from '../util/enum';
import { selector } from '../util/view-common';

const defaultMaxYear = 2100;
const defaultMinYear = 1900;
const currentYear = new Date().getFullYear();
// const currentMonth = new Date().getMonth() + 1;

function Popup(props) {
    const { left, top, min, max, checkValue, className, showThisMonth, onChange } = props;

    const [tempMode, setTempMode] = useState(enumObj.yearMonthModel);

    function getInitTempYear() {
        if (checkValue) {
            return parseInt(checkValue.split('/')[0], 10);
        }
		const maxYear = parseInt(max ? max.split('/')[0] : defaultMaxYear, 10);
		const minYear = parseInt(min ? min.split('/')[0] : defaultMinYear, 10);
		if (currentYear > maxYear) {
			return maxYear;
		}
		if (currentYear < minYear) {
			return minYear;
		}
        return currentYear;
    }

    // function getInitTempMonth() {
    //     if (checkValue) {
    //         return parseInt(checkValue.split('/')[1], 10);
    //     }
    //     return '';
    // }

    const [tempYear, setTempYear] = useState(getInitTempYear());

    // const [tempMonth, setTempMonth] = useState(getInitTempMonth());

    function getInitRegion() {
        const maxYear = parseInt(max ? max.split('/')[0] : defaultMaxYear, 10);
        const minYear = parseInt(min ? min.split('/')[0] : defaultMinYear, 10);
        if (currentYear + 7 <= maxYear || currentYear - 7 >= minYear) {
            return [currentYear - 7, currentYear + 7];
        } if (currentYear + 7 > maxYear) {
            return [maxYear - 14, maxYear];
        }
        return [minYear, minYear + 14];
    }

    const [region, setRegion] = useState(getInitRegion());

    function onHeaderChange(params) {
        if (tempMode === enumObj.yearModel) {
            if (params === enumObj.left) {
                setRegion([region[0] - 15, region[0] - 1]);
            } else if (params === enumObj.right) {
                setRegion([region[1] + 1, region[1] + 15]);
            }
        } else if (tempMode === enumObj.yearMonthModel) {
            setTempMode(enumObj.yearModel);
        }
    }

    function onYearGridChange(value) {
        if (tempMode === enumObj.yearModel) {
            setTempYear(value);
            setTempMode(enumObj.yearMonthModel);
        }
    }

    function onMonthGridChange(_m, y) {
        const m = _m < 10 ? `0${parseInt(_m, 10)}` : _m;
        onChange(`${y}/${m}`);
    }

    function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
    }

    function renderCompByMode(_mode) {
        if (_mode === enumObj.yearModel) {
        	const _min = parseInt(min.split('/')[0], 10);
        	const _max = parseInt(max.split('/')[0], 10);
        	const _checkYear = checkValue ? parseInt(checkValue.split('/')[0], 10) : null;
            return (<section>
				<YearRegionHeader
					min={_min}
					max={_max}
					region={region}
					onChange={onHeaderChange} />
				<YearGrid
					min={_min}
					max={_max}
					minRegion={region[0]}
					maxRegion={region[1]}
					checkValue={_checkYear}
					onChange={(value) => onYearGridChange(value)} />
			</section>);
        }
        if (_mode === enumObj.yearMonthModel) {
            return (<section>
                <YearMonthHeader
					year={tempYear}
					onChange={onHeaderChange} />
                <MonthGrid
					checkValue={checkValue}
					max={max}
					min={min}
					currentYear={tempYear}
					showThisMonth={showThisMonth}
					onChange={(m, y) => onMonthGridChange(m, y)} />
            </section>);
        }
        return null;
    }

	return (
        <div className={`${selector}-popup ${className}`} style={{ left, top }} onClick={popClick}>
            {renderCompByMode(tempMode)}
        </div>
	);
}

Popup.propTypes = {
	className: PropTypes.string,
    left: PropTypes.number,
    top: PropTypes.number,
    min: PropTypes.string,
    max: PropTypes.string,
    checkValue: PropTypes.string,
	onChange: PropTypes.func
}

Popup.defaultProps = {
	className: '',
	left: 0,
	top: 0,
	min: '',
	max: '',
	checkValue: '',
	onChange: () => { }
}

export default Popup;
