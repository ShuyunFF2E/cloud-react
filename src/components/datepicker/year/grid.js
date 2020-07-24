import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../button';
import { selectorClass, disClass } from '../constant';
import { displayNow } from '../utils';

const nowYear = new Date().getFullYear();

function getClassName(checkValue, current, min, max) {
	if (current < min || current > max) {
		return ` ${disClass} `;
	}
	if (checkValue === current) {
		return 'grid-check';
	}
	if (current === nowYear) {
		return 'grid-now';
	}
	return '';
}

class YearGrid extends Component {
	constructor(props) {
		super(props);

		const { minRegion, maxRegion, checkValue } = props;
		this.len = Math.ceil((maxRegion - minRegion) / 3);

		this.state = {
			tempYear: checkValue
		};
	}

	getDisabledNow = () => {
		const { min, max } = this.props;
		const { year } = displayNow();
		return year > max || year < min;
	};

	onUpdate = (year, cls) => {
		if (cls.indexOf(disClass) > -1) {
			return;
		}

		this.setState({
			tempYear: year
		});
	};

	onSave = year => {
		const { tempYear } = this.state;

		if (year) {
			this.props.onChange({ year });
			return;
		}
		this.props.onChange({ year: tempYear });
	};

	render() {
		const { minRegion, min, max } = this.props;
		const { tempYear } = this.state;

		return (
			<div className="grid">
				<table className="grid-table year-grid-table">
					<tbody>
						{Array.from({ length: this.len }).map((o, index) => {
							const index1 = minRegion + index * 3;
							const index2 = minRegion + index * 3 + 1;
							const index3 = minRegion + index * 3 + 2;
							const cls1 = getClassName(tempYear, index1, min, max);
							const cls2 = getClassName(tempYear, index2, min, max);
							const cls3 = getClassName(tempYear, index3, min, max);
							return (
								<tr key={index.toString()}>
									<td className={classNames('grid-item', cls1)}>
										<span onClick={() => this.onUpdate(index1, cls1)}>{index1}年</span>
									</td>
									<td className={classNames('grid-item', cls2)}>
										<span onClick={() => this.onUpdate(index2, cls2)}>{index2}年</span>
									</td>
									<td className={classNames('grid-item', cls3)}>
										<span onClick={() => this.onUpdate(index3, cls3)}>{index3}年</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className={`${selectorClass}-popup-btns`}>
					<Button size="small" disabled={this.getDisabledNow()} onClick={() => this.onSave(nowYear)}>
						今年
					</Button>
					<Button type="primary" size="small" disabled={!tempYear} onClick={() => this.onSave()}>
						确认
					</Button>
				</div>
			</div>
		);
	}
}

YearGrid.propTypes = {
	minRegion: PropTypes.number,
	maxRegion: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
	checkValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange: PropTypes.func
};

YearGrid.defaultProps = {
	minRegion: undefined,
	maxRegion: undefined,
	min: undefined,
	max: undefined,
	checkValue: '',
	onChange: () => {}
};

export default YearGrid;
