import React, { Component } from 'react';
import { ArrowLeft, ArrowRight } from '../common/arrow';
import MonthGrid from '../common/month-grid';
import { displayNow } from '../util';
import { enumObj, selectorClass } from '../constant';
import YearGrid from './grid';

export default class Popup extends Component {
	constructor(props) {
		super(props);

		const { tempMode, min, max } = props;

		this.minYear = parseInt(min.split('/')[0], 10);
		this.maxYear = parseInt(max.split('/')[0], 10);
		this.currentYear = displayNow().year;

		this.state = {
			region: this.getInitRegion(),
			tempMode,
			tempYear: this.getInitTempYear()
		};
	}

	getInitTempYear() {
		const { checkValue } = this.props;
		const { minYear, maxYear } = this;

		if (checkValue) {
			return parseInt(checkValue.split('/')[0], 10);
		}
		if (this.currentYear > maxYear) {
			return maxYear;
		}
		if (this.currentYear < minYear) {
			return minYear;
		}
		return this.currentYear;
	}

	getInitRegion = () => {
		const { minYear, maxYear } = this;
		const year = parseInt(this.props.checkValue.split('/')[0], 10) || this.currentYear;

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
		}
		if (tempMode === enumObj.YEAR_MONTH_MODEL) {
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

	handleLeftClick = params => {
		if (this.state.region[0] <= this.minYear) {
			return;
		}
		this.onYearHeaderChange(params);
	};

	handleRightClick = params => {
		if (this.state.region[1] >= this.maxYear) {
			return;
		}
		this.onYearHeaderChange(params);
	};

	renderYear() {
		const { region } = this.state;
		const { checkValue, showCurrent, className, left, top } = this.props;
		const { minYear, maxYear, onYearGridChange, popClick } = this;

		const _checkYear = checkValue ? parseInt(checkValue.split('/')[0], 10) : null;

		return (
			<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
				<div className="header">
					<ArrowLeft onClick={this.handleLeftClick} disabled={region[0] <= minYear} />
					<label>{region[0]}年</label>
					<i> - </i>
					<label>{region[1]}年</label>
					<ArrowRight onClick={this.handleRightClick} disabled={region[1] >= maxYear} />
				</div>
				<YearGrid
					{...this.props}
					min={minYear}
					max={maxYear}
					showThisYear={showCurrent}
					minRegion={region[0]}
					maxRegion={region[1]}
					checkValue={_checkYear}
					onChange={onYearGridChange}
				/>
			</div>
		);
	}

	renderYearMonth() {
		const {
			state: { tempYear },
			props: { checkValue, showCurrent, min, max, left, top, className },
			onMonthGridChange,
			onHeaderChange,
			popClick
		} = this;

		return (
			<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={popClick}>
				<section>
					<div className="header">
						<ArrowLeft onClick={onHeaderChange} />
						<label>{tempYear}年</label>
						<ArrowRight onClick={onHeaderChange} />
					</div>
					<MonthGrid checkValue={checkValue} max={max} min={min} currentYear={tempYear} showThisMonth={showCurrent} onChange={onMonthGridChange} />
				</section>
			</div>
		);
	}

	render() {
		const { tempMode } = this.state;

		if (tempMode === enumObj.YEAR_MODEL) {
			return this.renderYear();
		}

		if (tempMode === enumObj.YEAR_MONTH_MODEL) {
			return this.renderYearMonth();
		}

		return null;
	}
}
