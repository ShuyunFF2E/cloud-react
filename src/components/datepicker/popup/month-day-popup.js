import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MonthDayHeader from '../header/month-day-header';
import MonthGrid from '../grid/month-grid';
import DayGrid from '../grid/day-grid';
import enumObj from '../util/enum';
import { formatZero, selector } from '../util/view-common';

// const defaultMaxMonth = 12;
// const defaultMinMonth = 1;

const currentMonth = new Date().getMonth() + 1;
// const currentDay = new Date().getDate();


function Popup(props) {
    const { left, top, checkValue, className, showToday, onChange } = props;

    const [tempMode, setTempMode] = useState(enumObj.monthDayModel);

    function getInitTempMonth() {
        if (checkValue) {
            return parseInt(checkValue.split('/')[0],10);
        }
        return currentMonth;
    }

    function getInitTempDay() {
        if (checkValue) {
            return parseInt(checkValue.split('/')[1], 10);
        }
        return '';
    }

    const [tempMonth, setTempMonth] = useState(getInitTempMonth());

    const [tempDay, setTempDay] = useState(getInitTempDay());

    function onHeaderChange() {
        if (tempMode === enumObj.monthDayModel) {
            setTempMode(enumObj.monthModel);
        }
    }

    function onMonthGridChange(m) {
        setTempMonth(m);
        setTempMode(enumObj.monthDayModel);
    }

    function onDayGridChange(value) {
        setTempDay(value);
        onChange(`${formatZero(tempMonth)}/${formatZero(value)}`);
    }

    function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
    }

    function renderCompByMode(mode) {
        if (mode === enumObj.monthModel) {
            return (<section>
                    <MonthDayHeader />
                    <MonthGrid
						month={tempMonth}
						onChange={(m,y) => onMonthGridChange(m,y)}
					/>
                </section>);
        }
        if (mode === enumObj.monthDayModel) {
            return (<section>
                <MonthDayHeader
					month={tempMonth}
					onChange={onHeaderChange} />
                <DayGrid
					month={tempMonth}
					day={tempDay}
					showToday={showToday}
					checkValue={checkValue}
					onChange={onDayGridChange} />
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
	showToday: PropTypes.bool,
    left: PropTypes.number,
    top: PropTypes.number,
    checkValue: PropTypes.string,
	onChange: PropTypes.func
}

Popup.defaultProps = {
	left: 0,
	top: 0,
	showToday: false,
	checkValue: '',
	onChange: () => { }
}

export default Popup;
