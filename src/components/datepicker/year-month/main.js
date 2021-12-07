import React, { Component } from 'react';
import { displayNow } from '../utils';
import Select from '../../select';
import MonthGrid from './grid';

export default class YearMonth extends Component {
	constructor(props) {
		super(props);

		const { min, max } = props;

		this.minYear = parseInt(min.split('/')[0], 10);
		this.maxYear = parseInt(max.split('/')[0], 10);

		const { checkValue } = props;

		this.state = {
			checkValue,
			tempYear: this.getInitTempYear(checkValue)
		};
	}

	changeCheckValue = checkValue => {
		this.setState({
			checkValue,
			tempYear: this.getInitTempYear(checkValue)
		});
	};

	getInitTempYear(checkValue) {
		const currentYear = displayNow().year;

		const { minYear, maxYear } = this;

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

	handleYearChange = value => {
		this.setState({
			tempYear: value
		});
	};

	handleMonthGridChange = (_m, y) => {
		const m = _m < 10 ? `0${parseInt(_m, 10)}` : _m;
		this.props.onChange({
			year: y,
			month: m
		});
	};

	render() {
		const { checkValue, tempYear } = this.state;
		const { min, max, format } = this.props;

		const years = [];

		for (let i = this.minYear; i <= this.maxYear; i += 1) {
			years.push(
				<Select.Option key={String(i)} value={i}>
					{i}
				</Select.Option>
			);
		}

		return (
			<>
				<div className="header">
					<Select onChange={this.handleYearChange} value={tempYear} style={{ width: 90 }}>
						{years}
					</Select>
				</div>
				<MonthGrid checkValue={checkValue} max={max} min={min} selectedYear={tempYear} format={format} onChange={this.handleMonthGridChange} />
			</>
		);
	}
}
