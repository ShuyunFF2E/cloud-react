import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'cloud-react/button';
import { monthArr, selectorClass } from '../constant';

const currentMonth = new Date().getMonth() + 1;

function formatData(value) {
	return parseInt(value.split('-')[1], 10);
}

class MonthGrid extends Component {
	constructor(props) {
		super(props);

		const { checkValue, month } = props;

		this.state = {
			tempMonth: checkValue ? formatData(checkValue) : parseInt(month, 10)
		};
	}

	componentDidUpdate(prevProps) {
		const { month, checkValue } = this.props;

		if (prevProps.month !== month) {
			this.updateTempMonth(month);
		}

		if (prevProps.checkValue !== checkValue) {
			this.updateTempMonth(formatData(checkValue));
		}
	}

	updateTempMonth(value) {
		this.setState({
			tempMonth: value
		});
	}

	onUpdate = index => {
		this.updateTempMonth(index + 1);
	};

	getMonthDisabled = () => {
		const { currentYear, month, min, max } = this.props;
		// 月日 选择器时，不存在最大最小值区间
		if (month) {
			return false;
		}
		const maxYear = parseInt(max.split('/')[0], 10);
		const minYear = parseInt(min.split('/')[0], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return true;
		}
		if (currentYear === maxYear) {
			const maxYearMonth = parseInt(max.split('/')[1], 10);
			if (currentMonth > maxYearMonth) {
				return true;
			}
		}
		if (currentYear === minYear) {
			const minYearMonth = parseInt(min.split('/')[1], 10);
			if (currentMonth < minYearMonth) {
				return true;
			}
		}
		return false;
	};

	getClassName = (_tempMonth, current, _month) => {
		const { currentYear, month, min, max } = this.props;

		function simpleCheck() {
			if (_tempMonth) {
				if (parseInt(_tempMonth, 10) === current) {
					return 'grid-check';
				}
				if (current === _month) {
					return 'grid-now';
				}
				return '';
			}
			return '';
		}

		// 月日 选择器时，不存在最大最小值区间
		if (month) {
			return simpleCheck();
		}

		const maxYear = parseInt(max.split('/')[0], 10);
		const minYear = parseInt(min.split('/')[0], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return ' grid-disabled ';
		}
		if (currentYear === maxYear) {
			const maxYearMonth = parseInt(max.split('/')[1], 10);
			if (current > maxYearMonth) {
				return ' grid-disabled ';
			}
		}
		if (currentYear === minYear) {
			const minYearMonth = parseInt(min.split('/')[1], 10);
			if (current < minYearMonth) {
				return ' grid-disabled ';
			}
		}
		return simpleCheck();
	};

	onSave = value => {
		const { currentYear, onChange } = this.props;
		const { tempMonth } = this.state;

		if (value) {
			onChange(value, currentYear);
		} else if (tempMonth) {
			onChange(tempMonth, currentYear);
		}
	};

	render() {
		const { month } = this.props;
		const { tempMonth } = this.state;

		return (
			<div className="grid">
				<table className="grid-table year-grid-table">
					<tbody>
						{Array.from({ length: 4 }).map((o, index) => {
							const index1 = index * 3;
							const index2 = index * 3 + 1;
							const index3 = index * 3 + 2;
							return (
								<tr key={index.toString()}>
									<td className={this.getClassName(tempMonth, index1 + 1, month)}>
										<span onClick={() => this.onUpdate(index1)}>{monthArr[index1]}</span>
									</td>
									<td className={this.getClassName(tempMonth, index2 + 1, month)}>
										<span onClick={() => this.onUpdate(index2)}>{monthArr[index2]}</span>
									</td>
									<td className={this.getClassName(tempMonth, index3 + 1, month)}>
										<span onClick={() => this.onUpdate(index3)}>{monthArr[index3]}</span>
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
					<Button type="primary" size="small" disabled={!tempMonth} onClick={() => this.onSave()}>
						确认
					</Button>
				</div>
			</div>
		);
	}
}

MonthGrid.propTypes = {
	checkValue: PropTypes.string,
	month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func
};

MonthGrid.defaultProps = {
	month: undefined,
	checkValue: '',
	onChange: () => {}
};

export default MonthGrid;
