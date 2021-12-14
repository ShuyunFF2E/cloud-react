import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convert } from '../utils';
import { enumObj } from '../constant';
import Picker from '../common/picker';
import { PROPTYPES, DEFAULT_PROPS } from '../proptypes';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    const { showTimePicker, placeholder } = props;
    const tempPlaceholder = showTimePicker
      ? 'yyyy/mm/dd hh:mm:ss'
      : 'yyyy/mm/dd';
    this.height = showTimePicker ? 339 : 289;
    this.tempMode = showTimePicker
      ? enumObj.DATE_TIME_MODEL
      : enumObj.DATE_MODEL;
    this.placeholder = placeholder || tempPlaceholder;
  }

  formatValue = ({ year, month, day, hour, minute, second }, formatRule) => {
    const { showTimePicker, format } = this.props;
    const rule = formatRule || format;

    const output = showTimePicker
      ? { year, month, day, hour, minute, second }
      : { year, month, day };
    const _format = showTimePicker ? `${rule} hh:mm:ss` : rule;

    return convert(output, _format);
  };

  render() {
    const tempProps = { ...this.props, placeholder: this.placeholder };
    return (
      <Picker
        {...tempProps}
        tempMode={enumObj.DATE_MODEL}
        height={this.height}
        formatValue={this.formatValue}
      />
    );
  }
}

DatePicker.propTypes = {
  ...PROPTYPES,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
  showTimePicker: PropTypes.bool,
  defaultTime: PropTypes.string,
};

DatePicker.defaultProps = {
  ...DEFAULT_PROPS,
  format: 'yyyy/MM/dd',
  placeholder: '',
  minYear: 1980,
  maxYear: 2030,
  showTimePicker: false,
  defaultTime: '00:00:00',
};

export default DatePicker;
