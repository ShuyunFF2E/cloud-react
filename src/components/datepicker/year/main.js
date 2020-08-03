import React, { Component } from 'react';
import { ArrowLeft, ArrowRight } from '../common/arrow';
import { displayNow } from '../utils';
import YearGrid from './grid';

export default class Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			region: this.getInitRegion()
		};
	}

	getInitRegion = () => {
		const { min, max, checkValue } = this.props;
		const year = checkValue ? parseInt(checkValue, 10) : displayNow().year;

		if (year + 7 <= max || year - 7 >= min) {
			return [year - 7, year + 7];
		}
		return [max - 14, max];
	};

	handleLeftClick = () => {
		const { region } = this.state;
		this.setState({
			region: [region[0] - 15, region[0] - 1]
		});
	};

	handleRightClick = () => {
		const { region } = this.state;

		this.setState({
			region: [region[1] + 1, region[1] + 15]
		});
	};

	render() {
		const { region } = this.state;
		const { min, max, checkValue } = this.props;

		const _checkYear = checkValue ? parseInt(checkValue, 10) : null;

		return (
			<>
				<div className="header">
					<ArrowLeft onClick={this.handleLeftClick} disabled={region[0] <= min} />
					<label>{region[0]}年</label>
					<i> - </i>
					<label>{region[1]}年</label>
					<ArrowRight onClick={this.handleRightClick} disabled={region[1] >= max} />
				</div>
				<YearGrid {...this.props} minRegion={region[0]} maxRegion={region[1]} checkValue={_checkYear} />
			</>
		);
	}
}
