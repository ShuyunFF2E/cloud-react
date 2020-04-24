import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from '../common/arrow';
import MonthGrid from '../common/month-grid';
import { formatZero } from '../util/view-common';
import { enumObj, monthArr, selectorClass } from '../constant';
import Grid from './grid';

const currentMonth = new Date().getMonth() + 1;

class Popup extends Component {
	constructor(props) {
		super(props);

		const { checkValue } = props;

		this.state = {
			tempMode: enumObj.MONTH_DAY_MODEL,
			tempMonth: checkValue ? parseInt(checkValue.split('/')[0], 10) : currentMonth,
			tempDay: checkValue ? parseInt(checkValue.split('/')[1], 10) : ''
		};
	}

	handleMonthGridChange = m => {
		this.setState({
			tempMonth: m,
			tempMode: enumObj.MONTH_DAY_MODEL
		});
	};

	popClick = evt => {
		evt.stopPropagation();
		evt.nativeEvent.stopImmediatePropagation();
	};

	handleHeaderChange = params => {
		const { tempMonth } = this.state;

		if (params === enumObj.LEFT) {
			if (tempMonth > 1) {
				this.setState({
					tempMonth: tempMonth - 1
				});
			}
		} else if (tempMonth < 12) {
			this.setState({
				tempMonth: tempMonth + 1
			});
		}
		this.setState({
			tempDay: ''
		});
	};

	handleDayGridChange = (value, m) => {
		this.setState({
			tempDay: value
		});

		if (m) {
			this.setState({
				tempMonth: m
			});
			this.props.onChange(`${formatZero(m)}/${formatZero(value)}`);
		} else {
			this.props.onChange(`${formatZero(this.state.tempMonth)}/${formatZero(value)}`);
		}
	};

	handleChooseMonth = () => {
		const { tempMode } = this.state;

		if (tempMode === enumObj.MONTH_DAY_MODEL) {
			this.setState({
				tempMode: enumObj.MONTH_MODEL
			});
		}
	};

	renderMonth() {
		const { tempMonth } = this.state;

		return (
			<section>
				<div className="header">
					<label>选择月份</label>
				</div>
				<MonthGrid showThisMonth month={tempMonth} onChange={(m, y) => this.handleMonthGridChange(m, y)} />
			</section>
		);
	}

	renderDay() {
		const { tempMonth, tempDay } = this.state;

		return (
			<section>
				<div className="header">
					<section>
						<ArrowLeft disabled={tempMonth === 1} onClick={this.handleHeaderChange} />
						<label className="header-label" role="presentation" onClick={this.handleChooseMonth}>
							{monthArr[tempMonth - 1]}
						</label>
						<ArrowRight disabled={tempMonth === 12} onClick={this.handleHeaderChange} />
					</section>
				</div>
				<Grid {...this.props} month={tempMonth} day={tempDay} onChange={this.handleDayGridChange} />
			</section>
		);
	}

	render() {
		const { tempMode } = this.state;
		const { left, top, className } = this.props;

		return (
			<div className={`${selectorClass}-popup ${className}`} style={{ left, top }} onClick={this.popClick}>
				{tempMode === enumObj.MONTH_MODEL && this.renderMonth()}
				{tempMode === enumObj.MONTH_DAY_MODEL && this.renderDay()}
			</div>
		);
	}
}

Popup.propTypes = {
	showToday: PropTypes.bool,
	left: PropTypes.number,
	top: PropTypes.number,
	checkValue: PropTypes.string,
	onChange: PropTypes.func
};

Popup.defaultProps = {
	left: 0,
	top: 0,
	showToday: false,
	checkValue: '',
	onChange: () => {}
};

export default Popup;
