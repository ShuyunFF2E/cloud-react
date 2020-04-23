import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import MonthGrid from '../common/month-grid';
import Grid from './grid';
import { enumObj, selectorClass } from '../constant';
import { formatZero } from '../util/view-common';

const currentMonth = new Date().getMonth() + 1;

function Popup(props) {
	const { left, top, checkValue, className, showToday, onChange } = props;

	const [tempMode, setTempMode] = useState(enumObj.MONTH_DAY_MODEL);

	function getInitTempMonth() {
		if (checkValue) {
			return parseInt(checkValue.split('/')[0], 10);
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

	function onHeaderChange(params) {
		let m = tempMonth;
		if (params === enumObj.LEFT) {
			if (tempMonth > 1) {
				m = tempMonth - 1;
				setTempMonth(m);
			}
		} else if (tempMonth < 12) {
			m = tempMonth + 1;
			setTempMonth(m);
		}
		setTempDay('');
	}

	function onChooseMonth() {
		if (tempMode === enumObj.MONTH_DAY_MODEL) {
			setTempMode(enumObj.MONTH_MODEL);
		}
	}

	function onMonthGridChange(m) {
		setTempMonth(m);
		setTempMode(enumObj.MONTH_DAY_MODEL);
	}

	function onDayGridChange(value, m) {
		setTempDay(value);
		if (m) {
			setTempMonth(m);
			onChange(`${formatZero(m)}/${formatZero(value)}`);
		} else {
			onChange(`${formatZero(tempMonth)}/${formatZero(value)}`);
		}
	}

	function popClick(evt) {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	}

	function renderCompByMode(mode) {
		if (mode === enumObj.MONTH_MODEL) {
			return (
				<section>
					<Header />
					<MonthGrid month={tempMonth} onChange={(m, y) => onMonthGridChange(m, y)} />
				</section>
			);
		}
		if (mode === enumObj.MONTH_DAY_MODEL) {
			return (
				<section>
					<Header month={tempMonth} onChooseMonth={onChooseMonth} onChange={onHeaderChange} />
					<Grid month={tempMonth} day={tempDay} showToday={showToday} checkValue={checkValue} onChange={onDayGridChange} />
				</section>
			);
		}
		return null;
	}

	return (
		<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
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
};

Popup.defaultProps = {
	left: 0,
	top: 0,
	showToday: false,
	checkValue: '',
	onChange: () => {}
};

export default Popup;
