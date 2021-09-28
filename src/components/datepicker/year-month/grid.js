import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '@utils';
import { displayNow } from '../utils';
import Button from '../../button';
import { monthArr, selectorClass, disClass } from '../constant';

const currentMonth = new Date().getMonth() + 1;
const currentYear = displayNow().year;

function formatData(value) {
	return parseInt(value.split('/')[1], 10);
}

class MonthGrid extends Component {
	constructor(props) {
		super(props);
		const { checkValue } = props;
		this.state = {
			tempMonth: checkValue ? formatData(checkValue) : null
		};
	}

	componentDidUpdate(prevProps) {
		const { checkValue } = this.props;
		if (prevProps.checkValue !== checkValue) {
			this.updateTempMonth(formatData(checkValue));
		}
	}

	updateTempMonth(value) {
		this.setState({
			tempMonth: value
		});
	}

	onUpdate = (index, cls) => {
		if (cls.indexOf(disClass) > -1) {
			return;
		}
		this.updateTempMonth(index + 1);
	};

	getYearMonth() {
		const { min, max } = this.props;
		const maxYear = max ? parseInt(max.split('/')[0], 10) : '';
		const minYear = min ? parseInt(min.split('/')[0], 10) : '';
		const maxYearMonth = max ? parseInt(max.split('/')[1], 10) : '';
		const minYearMonth = min ? parseInt(min.split('/')[1], 10) : '';
		return { maxYear, minYear, maxYearMonth, minYearMonth };
	}

	getMonthDisabled = () => {
		const { maxYear, minYear, maxYearMonth, minYearMonth } = this.getYearMonth();
		const { month: currMonth, year: currYear } = displayNow();
		if (
			(maxYear && currYear < minYear) ||
			(maxYear && currYear > maxYear) ||
			(currYear === minYear && currMonth < minYearMonth) ||
			(currYear === maxYear && currMonth > maxYearMonth)
		) {
			return true;
		}
		return false;
	};

	getClassName = (_tempMonth, current, _month) => {
		const { selectedYear } = this.props;
		const { maxYear, minYear, maxYearMonth, minYearMonth } = this.getYearMonth();
		const isDisabled =
			(maxYear && currentYear > maxYear) ||
			(minYear && currentYear < minYear) ||
			(selectedYear === minYear && current < minYearMonth) ||
			(selectedYear === maxYear && current > maxYearMonth);
		const classNameArr = [];
		if (_tempMonth && parseInt(_tempMonth, 10) === current) {
			classNameArr.push('grid-check');
		}
		if (isDisabled) {
			classNameArr.push(disClass);
		}
		if (selectedYear === currentYear && current === _month) {
			classNameArr.push('grid-now');
		}
		return classNameArr.join(' ');
	};

	getSaveDisabled() {
		const { tempMonth: selectedMonth } = this.state;
		if (!selectedMonth) {
			return true;
		}
		const { selectedYear } = this.props;
		const { maxYear, minYear, maxYearMonth, minYearMonth } = this.getYearMonth();
		if ((minYear && selectedYear < minYear) || (maxYear && selectedYear > maxYear)) {
			return true;
		}
		if (selectedYear === minYear && selectedMonth < minYearMonth) {
			return true;
		}
		if (selectedYear === maxYear && selectedMonth > maxYearMonth) {
			return true;
		}
		return false;
	}

	onSave = value => {
		if (value) {
			this.props.onChange(value, currentYear);
		} else {
			const { selectedYear } = this.props;
			this.props.onChange(this.state.tempMonth, selectedYear);
		}
	};

	render() {
		const { tempMonth } = this.state;

		return (
			<div className="grid">
				<table className="grid-table year-grid-table">
					<tbody>
						{Array.from({ length: 4 }).map((o, index) => {
							const index1 = index * 3;
							const index2 = index * 3 + 1;
							const index3 = index * 3 + 2;
							const cls1 = this.getClassName(tempMonth, index1 + 1, currentMonth);
							const cls2 = this.getClassName(tempMonth, index2 + 1, currentMonth);
							const cls3 = this.getClassName(tempMonth, index3 + 1, currentMonth);
							return (
								<tr key={index.toString()}>
									<td className={classNames('grid-item', cls1)}>
										<span onClick={() => this.onUpdate(index1, cls1)}>{monthArr[index1]}</span>
									</td>
									<td className={classNames('grid-item', cls2)}>
										<span onClick={() => this.onUpdate(index2, cls2)}>{monthArr[index2]}</span>
									</td>
									<td className={classNames('grid-item', cls3)}>
										<span onClick={() => this.onUpdate(index3, cls3)}>{monthArr[index3]}</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className={`${selectorClass}-popup-btns`}>
					<Button size="small" disabled={this.getMonthDisabled()} onClick={() => this.onSave(currentMonth)}>
						当月
					</Button>
					<Button type="primary" size="small" disabled={this.getSaveDisabled()} onClick={() => this.onSave()}>
						确认
					</Button>
				</div>
			</div>
		);
	}
}

MonthGrid.propTypes = {
	checkValue: PropTypes.string,
	onChange: PropTypes.func
};

MonthGrid.defaultProps = {
	checkValue: '',
	onChange: noop
};

export default MonthGrid;
