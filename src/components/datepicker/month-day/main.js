import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight } from '../common/arrow';
import { enumObj, monthArr } from '../constant';
import { formatZero, displayNow } from '../utils';
import MonthGrid from '../common/month-grid';
import Grid from './grid';

class Popup extends Component {
	constructor(props) {
		super(props);

		const { checkValue } = props;

		this.state = {
			tempMode: enumObj.MONTH_DAY_MODEL,
			tempMonth: checkValue ? parseInt(checkValue.split('/')[0], 10) : displayNow().month,
			tempDay: checkValue ? parseInt(checkValue.split('/')[1], 10) : ''
		};
	}

	handleMonthGridChange = m => {
		this.setState({
			tempMonth: m,
			tempMode: enumObj.MONTH_DAY_MODEL
		});
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

	handleLeftClick = () => {
		const { tempMonth } = this.state;

		if (tempMonth > 1) {
			this.setState({
				tempMonth: tempMonth - 1,
				tempDay: ''
			});
		}
	};

	handleRightClick = () => {
		const { tempMonth } = this.state;

		if (tempMonth < 12) {
			this.setState({
				tempMonth: tempMonth + 1,
				tempDay: ''
			});
		}
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
			<>
				<div className="header">
					<label>选择月份</label>
				</div>
				<MonthGrid month={tempMonth} onChange={(m, y) => this.handleMonthGridChange(m, y)} />
			</>
		);
	}

	renderDay() {
		const { tempMonth, tempDay } = this.state;

		return (
			<>
				<div className="header">
					<section>
						<ArrowLeft disabled={tempMonth === 1} onClick={this.handleLeftClick} />
						<label className="header-label" role="presentation" onClick={this.handleChooseMonth}>
							{monthArr[tempMonth - 1]}
						</label>
						<ArrowRight disabled={tempMonth === 12} onClick={this.handleRightClick} />
					</section>
				</div>
				<Grid {...this.props} month={tempMonth} day={tempDay} onChange={this.handleDayGridChange} />
			</>
		);
	}

	render() {
		const { tempMode } = this.state;

		if (tempMode === enumObj.MONTH_MODEL) {
			return this.renderMonth();
		}

		if (tempMode === enumObj.MONTH_DAY_MODEL) {
			return this.renderDay();
		}

		return null;
	}
}

Popup.propTypes = {
	showToday: PropTypes.bool,
	checkValue: PropTypes.string,
	onChange: PropTypes.func
};

Popup.defaultProps = {
	showToday: true,
	checkValue: '',
	onChange: () => {}
};

export default Popup;
