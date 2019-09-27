import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { selector } from  '../util/view-common';

const monthArr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];

const currentMonth = new Date().getMonth() + 1;

function MonthGrid(props) {
	// 月日选择器是传入month
	// 年月选择器时传入checkValue, currentYear, max, min 其中max/min 都是 年/月 的格式
    const { month, checkValue, showThisMonth, max, min, currentYear, onChange } = props;

    function getInitTempMonth() {
		if (checkValue) {
			return parseInt(checkValue.split('/')[1],10);
		}
		return parseInt(month, 10);
	}

    const [tempMonth, setTempMonth] = useState(getInitTempMonth());

    useEffect(() => {
		setTempMonth(parseInt(month, 10));
	}, [month]);

	useEffect(() => {
		setTempMonth(parseInt(checkValue.split('/')[1],10));
	}, [checkValue]);

	function getMonthDisabled() {
		// 月日 选择器时，不存在最大最小值区间
		if (month) {
			return false;
		}
		const maxYear = parseInt(max.split('/')[0], 10);
		const minYear = parseInt(min.split('/')[0], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return true;
		}
		if (currentYear === maxYear) {
			const maxYearMonth = parseInt(max.split('/')[1], 10);
			if (currentMonth > maxYearMonth) {
				return true;
			}
		}
		if (currentYear === minYear) {
			const minYearMonth = parseInt(min.split('/')[1], 10);
			if (currentMonth < minYearMonth) {
				return true;
			}
		}
		return false;
	}

	function getClassName(_tempMonth, current, _month) {
		function simpleCheck() {
			if (_tempMonth) {
				if (parseInt(_tempMonth, 10) === current) {
					return 'check'
				}
				if (current === _month) {
					return 'now';
				}
				return '';
			}
			return '';
		}

		// 月日 选择器时，不存在最大最小值区间
		if (month) {
			return simpleCheck();
		}

		const maxYear = parseInt(max.split('/')[0], 10);
		const minYear = parseInt(min.split('/')[0], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return ' disabled ';
		}
		if (currentYear === maxYear) {
			const maxYearMonth = parseInt(max.split('/')[1], 10);
			if (current > maxYearMonth) {
				return ' disabled ';
			}
		}
		if (currentYear === minYear) {
			const minYearMonth = parseInt(min.split('/')[1], 10);
			if (current < minYearMonth) {
				return ' disabled ';
			}
		}
		return simpleCheck();
	}

    function onUpdate(index) {
        setTempMonth(index + 1);
    }

    function onSave(value) {
        if(value) {
            onChange(value, currentYear);
        } else if(tempMonth) {
        	onChange(tempMonth, currentYear);
        }
    }
	return (
        <div className="grid">
		<table className="grid-table year-grid-table">
            <tbody>
                {
                    Array.from({ length: 4 }).map((o,index) =>{
                        const index1 = index*3;
                        const index2 = index*3 + 1;
                        const index3 = index*3 + 2;
						return (<tr key={index.toString()}>
								<td className={getClassName(tempMonth, index1 + 1, month)}><span onClick={() => onUpdate(index1)}>{monthArr[index1]}月</span></td>
								<td className={getClassName(tempMonth, index2 + 1, month)}><span onClick={() => onUpdate(index2)}>{monthArr[index2]}月</span></td>
								<td className={getClassName(tempMonth, index3 + 1, month)}><span onClick={() => onUpdate(index3)}>{monthArr[index3]}月</span></td>
						</tr>);
                    })
                }
            </tbody>
        </table>
        <div className={`${selector}-popup-btns`} style={{ justifyContent: 'flex-end' }}>
			{
				showThisMonth && <button type="button" disabled={getMonthDisabled()} onClick={() => onSave(currentMonth)}>当月</button>
			}
            <button type="button" className={`${selector}-popup-btns-ok`} onClick={() => onSave()} style={{ marginLeft:'10px' }}>确认</button>
        </div>
	</div>);
}


MonthGrid.propTypes = {
    checkValue: PropTypes.string,
	month: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	onChange: PropTypes.func
}

MonthGrid.defaultProps = {
	month: undefined,
    checkValue: '',
	onChange: () => { }
}

export default MonthGrid;
