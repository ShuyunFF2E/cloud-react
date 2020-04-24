import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'cloud-react/button';
import { selectorClass } from '../constant';

const nowYear = new Date().getFullYear();
const disClass = 'grid-disabled';

function getClassName(checkValue, current, min, max) {
	if (current < min || current > max) {
		return ` ${disClass} `;
	}
	if (checkValue === current) {
		return 'grid-check';
	}
	if (current === nowYear) {
		return 'grid-now';
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

	function onUpdate(year, cls) {
		if (cls.indexOf(disClass) > -1) {
			return;
		}
		setTempYear(year);
	}

	function onSave(year) {
		if (year) {
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
					{Array.from({ length: len }).map((o, index) => {
						const index1 = minRegion + index * 3;
						const index2 = minRegion + index * 3 + 1;
						const index3 = minRegion + index * 3 + 2;
						const cls1 = getClassName(tempYear, index1, min, max);
						const cls2 = getClassName(tempYear, index2, min, max);
						const cls3 = getClassName(tempYear, index3, min, max);
						return (
							<tr key={index.toString()}>
								<td className={cls1}>
									<span onClick={() => onUpdate(index1, cls1)}>{index1}年</span>
								</td>
								<td className={cls2}>
									<span onClick={() => onUpdate(index2, cls2)}>{index2}年</span>
								</td>
								<td className={cls3}>
									<span onClick={() => onUpdate(index3, cls3)}>{index3}年</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className={`${selectorClass}-popup-btns`}>
				{showThisYear && (
					<Button size="small" disabled={getDisabledNow()} onClick={() => onSave(nowYear)}>
						今年
					</Button>
				)}
				<Button type="primary" size="small" disabled={!tempYear} onClick={() => onSave()} style={{ marginLeft: '10px' }}>
					确认
				</Button>
			</div>
		</div>
	);
}

YearGrid.propTypes = {
	showThisYear: PropTypes.bool,
	minRegion: PropTypes.number,
	maxRegion: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	checkValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func
};

YearGrid.defaultProps = {
	minRegion: undefined,
	maxRegion: undefined,
	min: undefined,
	max: undefined,
	showThisYear: false,
	checkValue: '',
	onChange: () => {}
};

export default YearGrid;
