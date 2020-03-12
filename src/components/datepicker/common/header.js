import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from 'cloud-react/icon';
import Select from 'cloud-react/select';
import util from '../util';

const { monthArr } = util;

export default class Header extends Component {
	handlePrevClick = () => {
		const { year, month } = this.props;

		const _month = month === 1 ? 12 : month - 1;
		const _year = month === 1 ? year - 1 : year;

		if (this.getDisabled(_month, _year)) {
			return;
		}

		this.props.onChange(parseInt(_year, 10), parseInt(_month, 10), { year, month });
	};

	handleNextClick = () => {
		const { year, month } = this.props;

		const _month = month === 12 ? 1 : month + 1;
		const _year = month === 12 ? year + 1 : year;

		if (this.getDisabled(_month, _year)) {
			return;
		}

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
			return _year * 12 + _currentMonth > maxYear * 12 + maxMonth;
		}

		if (!max && min) {
			const { year: minYear, month: minMonth } = min;
			return _year * 12 + _currentMonth < minYear * 12 + minMonth;
		}

		return false;
	};

	getDisabledYear = currentYear => {
		const { min, max } = this.props;
		let result = false;

		if (min && max) {
			result = currentYear < min.year || currentYear > max.year;
		} else if (max && !min) {
			result = currentYear > max.year;
		} else if (!max && min) {
			result = currentYear < min.year;
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
		const { year, minYear, maxYear } = this.props;

		for (let i = minYear; i <= maxYear; ) {
			years.push(
				<Select.Option key={String(i)} disabled={this.getDisabledYear(i)} value={i}>
					{i}
				</Select.Option>
			);
			i += 1;
		}

		return (
			<Select onChange={this.handleYearChange} value={year} style={{ width: 80 }}>
				{years}
			</Select>
		);
	}

	render() {
		const { month, style } = this.props;
		const arrowLeftClass = cls('arrow-left', {
			'arrow-disabled': this.getDisabled(month - 1)
		});
		const arrowRightClass = cls('arrow-right', {
			'arrow-disabled': this.getDisabled(month + 1)
		});
		return (
			<div className="header" style={style}>
				<span className={arrowLeftClass} onClick={this.handlePrevClick}>
					<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
				</span>
				{this.renderMonth()}
				{this.renderYear()}
				<span className={arrowRightClass} onClick={this.handleNextClick}>
					<Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
				</span>
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
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
	min: null,
	max: null,
	style: {},
	onChange: () => {}
};
