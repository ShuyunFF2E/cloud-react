import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'cloud-react/button';
import Week from './week';
import InnerTimePicker from './inner-time-picker';
import utils from '../util';
import { selector, rangeSelector } from '../util/view-common';

function Grid(props) {
	const { range, rangValue, onChange, onOK, showTimePicker, onTimePickChange, timeIsValid, mode } = props;
	const startGrid = range[0];
	const endGrid = range[1];

	const startGridLen = Math.ceil(startGrid.days.length / 7);
	const endGridLen = Math.ceil(endGrid.days.length / 7);

	const [OKDisabled, setOKDisabled] = useState(true);
	const [checkGridArr, setCheckGridArr] = useState(rangValue);

	useEffect(() => {
		setCheckGridArr(rangValue);
		if (rangValue[0] && rangValue[1] && timeIsValid) {
			setOKDisabled(false);
		} else {
			setOKDisabled(true);
		}
	}, [rangValue]);

	useEffect(() => {
		if (timeIsValid) {
			setOKDisabled(false);
		} else {
			setOKDisabled(true);
		}
	}, [timeIsValid]);

	function onPickDay(year, month, day) {
		let _startGrid = {};
		let _endGrid = {};
		let _gridArr = [];
		if (checkGridArr[0] && checkGridArr[1]) {
			_startGrid = { year, month, day };
			_endGrid = null;
			_gridArr = [_startGrid, _endGrid];
			setOKDisabled(true);
		} else if (checkGridArr[0] && !checkGridArr[1]) {
			_endGrid = { year, month, day };
			_gridArr = [checkGridArr[0], _endGrid];
		} else {
			_startGrid = { year, month, day };
			_gridArr = [_startGrid, checkGridArr[1]];
			setOKDisabled(true);
		}
		onChange(_gridArr);
		if (timeIsValid) {
			setOKDisabled(false);
		}
	}

	function onBtnOK() {
		onOK();
	}

	return (
		<div className={`${rangeSelector}-popup-container`}>
			<div className="grid" style={{ marginRight: '8px' }}>
				<table className="grid-table">
					<thead>
						<tr>
							{utils.miniWeek.map((e, i) => (
								<th key={i.toString()}>{e}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{utils.range(startGridLen).map((e, i) => (
							<Week
								key={i.toString()}
								year={startGrid.year}
								month={startGrid.month}
								checkGridArr={checkGridArr}
								minDate={startGrid.minDate}
								maxDate={startGrid.maxDate}
								onPickDate={onPickDay}
								days={startGrid.days.slice(i * 7, (i + 1) * 7)}
								head={i === 0}
								tail={i === startGridLen - 1}
							/>
						))}
					</tbody>
				</table>
				{showTimePicker && (
					<InnerTimePicker
						onChange={time => onTimePickChange(time, 'start')}
						mode={mode}
						hour={(checkGridArr[0] && checkGridArr[0].hour) || '00'}
						minute={(checkGridArr[0] && checkGridArr[0].minute) || '00'}
						second={(checkGridArr[0] && checkGridArr[0].second) || '00'}
					/>
				)}
			</div>
			<div className="grid">
				<table className="grid-table">
					<thead>
						<tr>
							{utils.miniWeek.map((e, i) => (
								<th key={i.toString()}>{e}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{utils.range(endGridLen).map((e, i) => (
							<Week
								key={i.toString()}
								year={endGrid.year}
								month={endGrid.month}
								checkGridArr={checkGridArr}
								rangeConfig={endGrid.config}
								minDate={endGrid.minDate}
								maxDate={endGrid.maxDate}
								onPickDate={onPickDay}
								days={endGrid.days.slice(i * 7, (i + 1) * 7)}
								head={i === 0}
								tail={i === endGridLen - 1}
							/>
						))}
					</tbody>
				</table>
				{showTimePicker && (
					<InnerTimePicker
						onChange={time => onTimePickChange(time, 'end')}
						mode={mode}
						hour={(checkGridArr[1] && checkGridArr[1].hour) || '00'}
						minute={(checkGridArr[1] && checkGridArr[1].minute) || '00'}
						second={(checkGridArr[1] && checkGridArr[1].second) || '00'}
					/>
				)}
				<div className={`${selector}-popup-btns`} style={{ justifyContent: 'flex-end' }}>
					<Button type="primary" size="small" disabled={OKDisabled} onClick={onBtnOK}>
						确定
					</Button>
				</div>
			</div>
		</div>
	);
}

Grid.propTypes = {
	range: PropTypes.array,
	rangValue: PropTypes.array,
	onChange: PropTypes.func,
	mode: PropTypes.string,
	onOK: PropTypes.func,
	showTimePicker: PropTypes.bool
};

Grid.defaultProps = {
	mode: undefined,
	range: [null, null],
	rangValue: [null, null],
	showTimePicker: false,
	onChange: () => {},
	onOK: () => {}
};

export default Grid;
