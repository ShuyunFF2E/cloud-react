import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { enumObj } from '../constant';
import Picker from '../common/picker';
import { PROPTYPES, DEFAULT_PROPS } from '../proptypes';

export default class YearPicker extends Component {
  formatValue = ({ year }) => {
    return year;
  };

  render() {
    const { value, defaultValue } = this.props;
    const time = value && typeof value === 'number' ? String(value) : value;
    const defaultTime =
      defaultValue && typeof defaultValue === 'number'
        ? String(defaultValue)
        : defaultValue;
    return (
      <Picker
        {...this.props}
        value={time}
        defaultValue={defaultTime}
        integer
        tempMode={enumObj.YEAR_MODEL}
        height={246}
        formatValue={this.formatValue}
      />
    );
  }
}

YearPicker.propTypes = {
  ...PROPTYPES,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
};

YearPicker.defaultProps = {
  ...DEFAULT_PROPS,
  min: 1900,
  max: 2100,
  placeholder: 'yyyy',
};
