import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convert } from '../util';
import { enumObj } from '../constant';
import Picker from './picker';

export class YearPicker extends Component {
	formatValue = output => {
		return output;
	};

	render() {
		return <Picker {...this.props} integer tempMode={enumObj.YEAR_MODEL} height={244} formatValue={this.formatValue} />;
	}
}
YearPicker.propTypes = {
	min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	placeholder: PropTypes.string
};

YearPicker.defaultProps = {
	min: 1900,
	max: 2100,
	placeholder: '请选择年份'
};

export class YearMonthPicker extends Component {
	formatValue = output => {
		const dateArr = output.split('/');
		return convert(
			{
				year: dateArr[0],
				month: dateArr[1]
			},
			this.props.format
		);
	};

	render() {
		return <Picker {...this.props} tempMode={enumObj.YEAR_MONTH_MODEL} height={211} formatValue={this.formatValue} />;
	}
}

YearMonthPicker.propTypes = {
	min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	format: PropTypes.string,
	placeholder: PropTypes.string
};

YearMonthPicker.defaultProps = {
	min: '1900/01',
	max: '2100/12',
	format: 'YYYY/MM',
	placeholder: '请选择年月'
};
