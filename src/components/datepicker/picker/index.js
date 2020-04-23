import React, { Component } from 'react';
import utils from '../util';
import { enumObj } from '../constant';

import Picker from './picker';

export class YearPicker extends Component {
	formatValue = output => {
		return output;
	};

	render() {
		const { min = 1990, max = 2100, ...otherProps } = this.props;
		return <Picker {...otherProps} min={min} max={max} integer tempMode={enumObj.YEAR_MODEL} height={244} formatValue={this.formatValue} />;
	}
}

export class YearMonthPicker extends Component {
	formatValue = output => {
		const dateArr = output.split('/');
		return utils.convert(
			{
				year: dateArr[0],
				month: dateArr[1]
			},
			this.props.format || 'YYYY/MM'
		);
	};

	render() {
		const { min = '1900/01', max = '2100/12', format = 'YYYY/MM', ...otherProps } = this.props;
		return <Picker {...otherProps} min={min} max={max} format={format} tempMode={enumObj.YEAR_MONTH_MODEL} height={211} formatValue={this.formatValue} />;
	}
}
