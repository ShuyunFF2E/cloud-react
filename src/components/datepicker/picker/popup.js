import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import YearRegionHeader from './year-region-header';
import YearGrid from './grid';
import Header from './header';
import MonthGrid from '../common/month-grid';
import { enumObj, selectorClass } from '../constant';
// import { selector } from '../util/view-common';
import { currentYear, defaultMaxYear, defaultMinYear } from './const';

export default class Popup extends Component {
	constructor(props) {
		super(props);

		const { tempMode } = props;

		this.state = {
			region: this.getInitRegion(),
			tempMode,
			tempYear: this.getInitTempYear()
		};
	}

	maxYear = parseInt(this.props.max ? this.props.max.split('/')[0] : defaultMaxYear, 10);

	minYear = parseInt(this.props.min ? this.props.min.split('/')[0] : defaultMinYear, 10);

	getInitTempYear() {
		const {
			props: { checkValue },
			minYear,
			maxYear
		} = this;
		if (checkValue) {
			return parseInt(checkValue.split('/')[0], 10);
		}
		if (currentYear > maxYear) {
			return maxYear;
		}
		if (currentYear < minYear) {
			return minYear;
		}
		return currentYear;
	}

	getInitRegion = () => {
		const {
			props: { checkValue },
			minYear,
			maxYear
		} = this;
		const year = parseInt(checkValue ? checkValue.split('/')[0] : defaultMinYear, 10);
		if (year + 7 <= maxYear || year - 7 >= minYear) {
			return [year - 7, year + 7];
		}
		if (year + 7 > maxYear) {
			return [maxYear - 14, maxYear];
		}
		return [minYear, minYear + 14];
	};

	onHeaderChange = params => {
		const { tempMode } = this.state;
		if (tempMode === enumObj.YEAR_MODEL) {
			this.onYearHeaderChange(params);
		} else if (tempMode === enumObj.YEAR_MONTH_MODEL) {
			this.setState({
				tempMode: enumObj.YEAR_MODEL
			});
		}
	};

	onYearHeaderChange = params => {
		const { region } = this.state;
		if (params === enumObj.LEFT) {
			this.setState({
				region: [region[0] - 15, region[0] - 1]
			});
		} else if (params === enumObj.RIGHT) {
			this.setState({
				region: [region[1] + 1, region[1] + 15]
			});
		}
	};

	onYearGridChange = value => {
		if (this.props.tempMode === enumObj.YEAR_MODEL) {
			this.props.onChange(value);
			return;
		}
		this.setState({
			tempYear: value,
			tempMode: enumObj.YEAR_MONTH_MODEL
		});
	};

	onMonthGridChange = (_m, y) => {
		const m = _m < 10 ? `0${parseInt(_m, 10)}` : _m;
		this.props.onChange(`${y}/${m}`);
	};

	popClick = evt => {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	};

	renderYear() {
		const {
			state: { region },
			props: { min, max, checkValue, showCurrent, className, left, top },
			onYearHeaderChange,
			onYearGridChange,
			popClick
		} = this;
		const _min = parseInt(min.split('/')[0], 10);
		const _max = parseInt(max.split('/')[0], 10);
		const _checkYear = checkValue ? parseInt(checkValue.split('/')[0], 10) : null;
		return (
			<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
				<YearRegionHeader min={_min} max={_max} region={region} onChange={onYearHeaderChange} />
				<YearGrid
					{...this.props}
					min={_min}
					max={_max}
					showThisYear={showCurrent}
					minRegion={region[0]}
					maxRegion={region[1]}
					checkValue={_checkYear}
					onChange={onYearGridChange}
				/>
			</div>
		);
	}

	render() {
		const {
			state: { tempMode, tempYear },
			props: { checkValue, showCurrent, min, max, left, top, className },
			onMonthGridChange,
			onHeaderChange,
			popClick
		} = this;

		if (tempMode === enumObj.YEAR_MODEL) {
			return this.renderYear();
		}

		return (
			<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
				<section>
					<Header year={tempYear} onChange={onHeaderChange} />
					<MonthGrid checkValue={checkValue} max={max} min={min} currentYear={tempYear} showThisMonth={showCurrent} onChange={onMonthGridChange} />
				</section>
			</div>
		);
	}
}
