import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from '@utils';
import Select from '../../select';
import { monthArr } from '../constant';
import { ArrowLeft, ArrowRight } from './arrow';
import { displayNow } from '../util/index';

export default class Header extends Component {
	handlePrevClick = () => {
		const { year, month } = this.props;

		const _month = month === 1 ? 12 : month - 1;
		const _year = month === 1 ? year - 1 : year;

		this.props.onChange(parseInt(_year, 10), parseInt(_month, 10), { year, month });
	};

	handleNextClick = () => {
		const { year, month } = this.props;

		const _month = month === 12 ? 1 : month + 1;
		const _year = month === 12 ? year + 1 : year;

		this.props.onChange(parseInt(_year, 10), parseInt(_month, 10), { year, month });
	};

	handleMonthChange = value => {
		const { year, month } = this.props;
		this.props.onChange(year, value, { year, month });
	};

	handleYearChange = value => {
		const { year, month } = this.props;
		this.props.onChange(value, month, { year, month });
	};

	getDisabled = (currentMonth, currentYear = this.props.year) => {
		const { min, max } = this.props;

		let _year = currentYear;
		let _currentMonth = currentMonth;

		if (_currentMonth === 13) {
			_currentMonth = 1;
			_year += 1;
		} else if (_currentMonth === 0) {
			_currentMonth = 12;
			_year -= 1;
		}

		if (max && min) {
			const { year: maxYear, month: maxMonth } = max;
			const { year: minYear, month: minMonth } = min;
			return _year * 12 + _currentMonth > maxYear * 12 + maxMonth || _year * 12 + _currentMonth < minYear * 12 + minMonth;
		}

		if (max && !min) {
			const { year: maxYear, month: maxMonth } = max;
			return _year * 12 + _currentMonth > maxYear * 12 + maxMonth || _year < this.props.minYear;
		}

		if (!max && min) {
			const { year: minYear, month: minMonth } = min;
			return _year * 12 + _currentMonth < minYear * 12 + minMonth || _year > this.props.maxYear;
		}

		if (!max && !min) {
			return _year < this.props.minYear || _year > this.props.maxYear;
		}

		return false;
	};

	getMinYear = () => {
		const { min, minYear, year } = this.props;
		const _minYear = min && min.year < minYear ? min.year : minYear;
		return year < _minYear ? year : _minYear;
	};

	getMaxYear = () => {
		const { max, maxYear, year } = this.props;
		const _maxYear = max && max.year > maxYear ? max.year : maxYear;
		return year > _maxYear ? year : _maxYear;
	};

	getDisabledYear = currentYear => {
		const { min, max } = this.props;
		let result = false;
		if (min && max) {
			result = currentYear < min.year || currentYear > max.year;
		} else if (max && !min) {
			result = currentYear > max.year || currentYear < this.getMinYear();
		} else if (!max && min) {
			result = currentYear < min.year || currentYear > this.getMaxYear();
		} else if (!max && !min) {
			result = currentYear < this.getMinYear() || currentYear > this.getMaxYear();
		}
		return result;
	};

	renderMonth() {
		const { month } = this.props;
		return (
			<Select onChange={this.handleMonthChange} value={month} style={{ width: 82, marginRight: 5 }}>
				{monthArr.map((str, index) => {
					const disabled = this.getDisabled(index + 1);
					return (
						<Select.Option value={index + 1} disabled={disabled} key={String(index + 1)}>
							{str}
						</Select.Option>
					);
				})}
			</Select>
		);
	}

	renderYear() {
		const years = [];
		const { year } = this.props;
		const min = this.getMinYear();
		const max = this.getMaxYear();

		for (let i = min; i <= max; i += 1) {
			years.push(
				<Select.Option key={String(i)} disabled={this.getDisabledYear(i)} value={i}>
					{i}
				</Select.Option>
			);
		}
		return (
			<Select onChange={this.handleYearChange} value={year} style={{ width: 80 }}>
				{years}
			</Select>
		);
	}

	render() {
		const { month, style } = this.props;

		return (
			<div className="header" style={style}>
				<ArrowLeft disabled={this.getDisabled(month - 1)} onClick={this.handlePrevClick} />
				{this.renderMonth()}
				{this.renderYear()}
				<ArrowRight disabled={this.getDisabled(month + 1)} onClick={this.handleNextClick} />
			</div>
		);
	}
}

Header.propTypes = {
	year: PropTypes.number,
	month: PropTypes.number,
	min: PropTypes.object,
	max: PropTypes.object,
	style: PropTypes.object,
	onChange: PropTypes.func
};

Header.defaultProps = {
	year: displayNow().year,
	month: displayNow().month,
	min: null,
	max: null,
	style: {},
	onChange: noop
};
