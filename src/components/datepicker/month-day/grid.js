import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../button';
import { selectorClass } from '../constant';
import { formatZero, refreshDays, displayNow } from '../utils';
import Week from '../common/week';

class Grid extends Component {
	constructor(props) {
		super(props);

		const { day } = props;

		this.state = {
			tempDay: day
		};
	}

	componentDidUpdate(prevProps) {
		const { day } = prevProps;

		if (day !== this.props.day) {
			this.updateDayState();
		}
	}

	updateDayState() {
		this.setState({
			tempDay: this.props.day
		});
	}

	handlePickDate = ({ month, day }) => {
		this.setState({
			tempDay: day
		});
		this.props.onPickDate({ month, day });
	};

	handleSave = (_, value, m) => {
		if (value) {
			this.props.onOk(value, m);
		} else {
			this.props.onOk(formatZero(this.state.tempDay));
		}
	};

	render() {
		const {
			props: { month, min, max },
			state: { tempDay },
			handleSave
		} = this;

		const { year, day } = displayNow();
		const days = refreshDays(year, month);
		const minDate = min ? new Date(min).setFullYear(year) : undefined;
		const maxDate = max ? new Date(max).setFullYear(year) : undefined;

		return (
			<div className="grid">
				<Week
					currentDateObj={{
						year,
						month,
						day: tempDay
					}}
					minDate={new Date(minDate)}
					maxDate={new Date(maxDate)}
					onPickDate={this.handlePickDate}
					days={days}
				/>
				<div className={`${selectorClass}-popup-btns`}>
					<Button size="small" onClick={() => handleSave(null, formatZero(day), month)}>
						今天
					</Button>
					<Button type="primary" size="small" disabled={!tempDay} onClick={handleSave}>
						确认
					</Button>
				</div>
			</div>
		);
	}
}

Grid.propTypes = {
	month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onOk: PropTypes.func
};

Grid.defaultProps = {
	month: undefined,
	day: undefined,
	onOk: () => {}
};

export default Grid;
