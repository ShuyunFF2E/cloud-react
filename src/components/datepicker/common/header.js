import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import Icon from 'cloud-react/icon';
import util from '../util';
import enumObj from '../util/enum';

const { monthArr } = util;

export default class Header extends React.Component {
	static propTypes = {
		year: PropTypes.number,
		month: PropTypes.number,
		min: PropTypes.object,
        max: PropTypes.object,
		style: PropTypes.object,
		onChange: PropTypes.func
	}

	static defaultProps = {
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		min: null,
		max: null,
		style: {},
		onChange: () => { }
	}

	onChange = params => evt => {
		const { year, month } = this.props;
		let _month = month;
		let _year = year;
		if (params === enumObj.LEFT) {
			if (month > 1) {
				_month = month - 1;
			} else {
				_month = 12;
				_year = year - 1;
			}
			if (this.getDisabled(_month, _year)) {
				return;
			}
		} else if (params === enumObj.RIGHT) {
			if (month === 12) {
				_month = 1;
				_year = year + 1;
			} else {
				_month = month + 1;
			}
			if (this.getDisabled(_month, _year)) {
				return;
			}
		} else if (params === enumObj.MONTH) {
			_month = evt.target.value;
		} else if (params === enumObj.YEAR) {
			_year = evt.target.value;
		}

		// 第3个参数为old 年月
		this.props.onChange(parseInt(_year, 10), parseInt(_month, 10), {
			year,
			month
		});
	}

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
			return (_year * 12 + _currentMonth) > (maxYear * 12 + maxMonth) || (_year * 12 + _currentMonth) < (minYear * 12 + minMonth);
		}
		if (max && !min) {
			const { year: maxYear, month: maxMonth } = max;
			return (_year * 12 + _currentMonth) > (maxYear * 12 + maxMonth);
		}
		if (!max && min) {
			const { year: minYear, month: minMonth } = min;
			return (_year * 12 + _currentMonth) < (minYear * 12 + minMonth);
		}
		return false;
	}

	getDisabledYear = (currentYear) => {
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
	}

	renderMonth() {
		const { month } = this.props;
		return (<select onChange={this.onChange(enumObj.MONTH)} value={month}>
			{
				monthArr.map((str, index) => {
					const disabled = this.getDisabled(index + 1);
					return <option key={(index + 1).toString()} disabled={disabled} value={index + 1}>{str}</option>
				})
			}
		</select>);
	}

	renderYear() {
		const years = [];
		const currentYear = this.props.year;
		for (let i = currentYear - 50; i < currentYear + 10;) {
			years.push(<option key={i.toString()} disabled={this.getDisabledYear(i)} value={i}>{i}</option>);
			i += 1;
		}
		return (<select onChange={this.onChange(enumObj.YEAR)} value={currentYear}>
			{
				years
			}
		</select>);
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
				<span className={arrowLeftClass} onClick={this.onChange(enumObj.LEFT)}>
					<Icon type="left" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
				</span>
				{
					this.renderMonth()
				}
				{
					this.renderYear()
				}
				<span className={arrowRightClass} onClick={this.onChange(enumObj.RIGHT)}>
					<Icon type="right" style={{ fontSize: '16px', verticalAlign: 'middle' }} />
				</span>
			</div>
		)
	}
}
