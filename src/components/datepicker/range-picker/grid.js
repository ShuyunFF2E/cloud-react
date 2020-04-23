import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'cloud-react/button';
import Week from './week';
import utils from '../util';
// import { selector, rangeSelector } from '../util/view-common';
import { miniWeek, selectorClass, rangeSelectorClass } from '../constant';

function Grid(props) {
	const { range, rangValue, onChange, onOK } = props;
	const startGrid = range[0];
	const endGrid = range[1];

	const startGridLen = Math.ceil(startGrid.days.length / 7);
	const endGridLen = Math.ceil(endGrid.days.length / 7);

	const [OKDisabled, setOKDisabled] = useState(true);
	const [checkGridArr, setCheckGridArr] = useState(rangValue);

	useEffect(() => {
		setCheckGridArr(rangValue);
		if (rangValue[0] && rangValue[1]) {
			setOKDisabled(false);
		} else {
			setOKDisabled(true);
		}
	}, [rangValue]);

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
			setOKDisabled(false);
		} else {
			_startGrid = { year, month, day };
			_gridArr = [_startGrid, checkGridArr[1]];
			setOKDisabled(true);
		}
		onChange(_gridArr);
	}

	function onBtnOK() {
		onOK(checkGridArr);
	}

	return (
		<div className={`${rangeSelectorClass}-popup-container`}>
			<div className="grid" style={{ marginRight: '8px' }}>
				<table className="grid-table">
					<thead>
						<tr>
							{miniWeek.map((e, i) => (
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
			</div>
			<div className="grid">
				<table className="grid-table">
					<thead>
						<tr>
							{miniWeek.map((e, i) => (
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
				<div className={`${selectorClass}-popup-btns`} style={{ justifyContent: 'flex-end' }}>
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
	onOK: PropTypes.func
};

Grid.defaultProps = {
	range: [null, null],
	rangValue: [null, null],
	onChange: () => {},
	onOK: () => {}
};

export default Grid;
