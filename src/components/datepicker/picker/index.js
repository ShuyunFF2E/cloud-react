import React, { Component } from 'react';
import enumObj from '../util/enum';
import { datepickerUI } from '../util/view-common';
import utils from '../util';
import Picker from './picker';

const { YEAR_MODEL, YEAR_MONTH_MODEL } = enumObj;
const { HEIGHT_YEAR, HEIGHT_MONTH } = datepickerUI;

export class YearPicker extends Component {

    formatValue = output => {
        return output;
    }

    render() {
        const { min = 1990, max = 2100, ...otherProps } = this.props;
        return (
            <Picker
                {...otherProps}
                min={min}
                max={max}
                integer
                tempMode={YEAR_MODEL}
				height={HEIGHT_YEAR}
                formatValue={this.formatValue}
            />
        )
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
    }

    render() {
        const { min = '1900/01', max = '2100/12', format = 'YYYY/MM', ...otherProps } = this.props;
        return (
            <Picker
                {...otherProps}
                min={min}
                max={max}
                format={format}
                tempMode={YEAR_MONTH_MODEL}
				height={HEIGHT_MONTH}
                formatValue={this.formatValue}
            />
        )
    }
}
