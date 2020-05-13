import React, { Component } from 'react';
import { displayNow } from '../utils';
import Select from '../../select';
import MonthGrid from '../common/month-grid';

export default class Popup extends Component {
	constructor(props) {
		super(props);

		const { min, max } = props;

		this.minYear = parseInt(min.split('/')[0], 10);
		this.maxYear = parseInt(max.split('/')[0], 10);

		this.state = {
			tempYear: this.getInitTempYear()
		};
	}

	getInitTempYear() {
		const currentYear = displayNow().year;
		const { checkValue } = this.props;
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
		this.props.onChange(`${y}/${m}`);
	};

	render() {
		const { tempYear } = this.state;
		const { checkValue, min, max } = this.props;

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
				<MonthGrid checkValue={checkValue} max={max} min={min} currentYear={tempYear} onChange={this.handleMonthGridChange} />
			</>
		);
	}
}
