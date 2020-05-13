import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../common/picker';
import { convert } from '../utils';
import { enumObj } from '../constant';

export default class YearMonthPicker extends Component {
	formatValue = ({ year, month }) => {
		return convert({ year, month }, this.props.format);
	};

	render() {
		return <Picker {...this.props} tempMode={enumObj.YEAR_MONTH_MODEL} height={210} formatValue={this.formatValue} />;
	}
}

YearMonthPicker.propTypes = {
	min: PropTypes.string,
	max: PropTypes.string,
	format: PropTypes.string,
	placeholder: PropTypes.string
};

YearMonthPicker.defaultProps = {
	min: '1900/01',
	max: '2100/12',
	format: 'YYYY/MM',
	placeholder: '请选择年月'
};
