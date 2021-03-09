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

	getMonthDisabled = () => {
		const { min, max } = this.props;
		const maxYear = parseInt(max.split('/')[0], 10);
		const minYear = parseInt(min.split('/')[0], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return true;
		}
		if (currentYear === maxYear) {
			const maxYearMonth = parseInt(max.split('/')[1], 10);
			const minYearMonth = parseInt(min.split('/')[1], 10);
			if (currentMonth > maxYearMonth || currentMonth < minYearMonth) {
				return true;
			}
		}
		return false;
	};

	getClassName = (_tempMonth, current, _month) => {
		const { selectedYear, min, max } = this.props;
		const { splitStr } = this.state;

		if (_tempMonth && parseInt(_tempMonth, 10) === current) {
			return 'grid-check';
		}

		const maxYear = parseInt(max.split(splitStr)[0], 10);
		const minYear = parseInt(min.split(splitStr)[0], 10);
		const maxYearMonth = parseInt(max.split(splitStr)[1], 10);
		const minYearMonth = parseInt(min.split(splitStr)[1], 10);
		if (currentYear > maxYear || currentYear < minYear) {
			return ` ${disClass} `;
		}
		if (selectedYear < currentYear && current < minYearMonth) {
			return ` ${disClass} `;
		}
		if (selectedYear > currentYear && current > maxYearMonth) {
			return ` ${disClass} `;
		}
		if (selectedYear === currentYear) {
			if ((current < minYearMonth && currentYear === minYear) || (current > maxYearMonth && currentYear === maxYear)) {
				return ` ${disClass} `;
			}
			if (current === _month) {
				return 'grid-now';
			}
		}
		return '';
	};

	onSave = value => {
		const { selectedYear, onChange } = this.props;
		const { tempMonth } = this.state;
		const month = value || tempMonth;
		onChange(month, selectedYear);
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
	onChange: PropTypes.func
};

MonthGrid.defaultProps = {
	checkValue: '',
	onChange: noop
};

export default MonthGrid;
