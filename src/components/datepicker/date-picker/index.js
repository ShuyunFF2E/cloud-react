import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convert } from '../utils';
import { enumObj } from '../constant';
import Picker from '../common/picker';

class DatePicker extends Component {
	constructor(props) {
		super(props);

		this.height = props.showTimePicker ? 321 : 262;
		this.tempMode = props.showTimePicker ? enumObj.DATE_TIME_MODEL : enumObj.DATE_MODE;
	}

	formatValue = ({ year, month, day, hour, minute, second }) => {
		const { showTimePicker, format } = this.props;

		const output = showTimePicker ? { year, month, day, hour, minute, second } : { year, month, day };
		const _format = showTimePicker ? `${format} hh:mm:ss` : format;

		return convert(output, _format);
	};

	render() {
		return <Picker {...this.props} tempMode={enumObj.DATE_MODEL} height={this.height} formatValue={this.formatValue} />;
	}
}

DatePicker.propTypes = {
	format: PropTypes.string,
	placeholder: PropTypes.string,
	maxYear: PropTypes.number,
	minYear: PropTypes.number,
	showTimePicker: PropTypes.bool,
	defaultTime: PropTypes.string
};

DatePicker.defaultProps = {
	format: 'yyyy/MM/dd',
	placeholder: '请选择日期',
	minYear: 1980,
	maxYear: 2030,
	showTimePicker: false,
	defaultTime: '00:00:00'
};

export default DatePicker;
