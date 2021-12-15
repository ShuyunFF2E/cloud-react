import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from '../common/picker';
import { convert } from '../utils';
import { enumObj } from '../constant';
import { PROPTYPES, DEFAULT_PROPS } from '../proptypes';

export default class YearMonthPicker extends Component {
  formatValue = ({ year, month }, format) => {
    const rule = format || this.props.format;
    return convert({ year, month }, rule);
  };

  render() {
    return (
      <Picker
        {...this.props}
        tempMode={enumObj.YEAR_MONTH_MODEL}
        height={212}
        formatValue={this.formatValue}
      />
    );
  }
}

YearMonthPicker.propTypes = {
  ...PROPTYPES,
  min: PropTypes.string,
  max: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
};

YearMonthPicker.defaultProps = {
  ...DEFAULT_PROPS,
  min: '1900/01',
  max: '2100/12',
  format: 'YYYY/MM',
  placeholder: 'yyyy/mm',
};
