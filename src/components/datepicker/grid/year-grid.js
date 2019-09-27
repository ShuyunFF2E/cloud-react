import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { selector } from  '../util/view-common';

const nowYear = new Date().getFullYear();

function getClassName(checkValue, current, min, max) {
    if (current < min || current > max) {
        return ' disabled ';
    }
    if (checkValue === current) {
    	return 'check';
	}
    if (current === nowYear) {
    	return 'now'
	}
    return '';
}

function YearGrid(props) {
	const { minRegion, maxRegion, checkValue, min, max, showThisYear, onChange } = props;
    const len = Math.ceil((maxRegion - minRegion) / 3);


    const [tempYear, setTempYear] = useState(checkValue);

    useEffect(() => {
		setTempYear(checkValue);
	}, [checkValue]);


    function onUpdate(year) {
        setTempYear(year);
    }

    function onSave(year) {
        if(year) {
            onChange(year);
        } else if (tempYear) {
            onChange(tempYear);
        }
    }

    function getDisabledNow() {
		return nowYear > max || nowYear < min;
	}

	return (
        <div className="grid">
		<table className="grid-table year-grid-table">
            <tbody>
                {
                    Array.from({ length: len }).map((o,index) =>{
                        const index1 = minRegion + index * 3;
                        const index2 = minRegion + index * 3 + 1;
                        const index3 = minRegion + index * 3 + 2;
						return (<tr key={index.toString()}>
								<td className={getClassName(tempYear, index1, min, max)}><span onClick={() => onUpdate(index1)}>{index1}年</span></td>
								<td className={getClassName(tempYear, index2, min, max)}><span onClick={() => onUpdate(index2)}>{index2}年</span></td>
								<td className={getClassName(tempYear, index3, min, max)}><span onClick={() => onUpdate(index3)}>{index3}年</span></td>
						</tr>);
                    })
                }
            </tbody>
        </table>
        <div className={`${selector}-popup-btns`} style={{ justifyContent: 'flex-end' }}>
			{
				showThisYear &&  <button type="button" disabled={getDisabledNow()} onClick={() => onSave(nowYear)}>今年</button>
			}
            <button type="button" className={`${selector}-popup-btns-ok`} onClick={() => onSave()} style={{ marginLeft: '10px' }}>确认</button>
        </div>
	</div>);
}


YearGrid.propTypes = {
	showThisYear: PropTypes.bool,
    minRegion: PropTypes.number,
    maxRegion: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    checkValue:  PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	onChange: PropTypes.func
}

YearGrid.defaultProps = {
	minRegion: undefined,
	maxRegion: undefined,
	min: undefined,
	max: undefined,
	showThisYear: false,
	checkValue: '',
    onChange: () => { }
}

export default YearGrid;
