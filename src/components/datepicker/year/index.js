import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { enumObj } from '../constant';
import Picker from '../common/picker';

export default class YearPicker extends Component {
	formatValue = ({ year }) => {
		return year;
	};

	render() {
		const { value, defaultValue } = this.props;
		const time = value ? new Date().setFullYear(value) : null;
		const defaultTime = defaultValue ? new Date().setFullYear(defaultValue) : null;
		return (
			<Picker {...this.props} value={time} defaultValue={defaultTime} integer tempMode={enumObj.YEAR_MODEL} height={246} formatValue={this.formatValue} />
		);
	}
}

YearPicker.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	placeholder: PropTypes.string
};

YearPicker.defaultProps = {
	min: 1900,
	max: 2100,
	placeholder: '请选择年份'
};
