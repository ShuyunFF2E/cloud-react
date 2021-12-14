import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convert } from '../utils';
import { enumObj } from '../constant';
import Picker from '../common/picker';
import { PROPTYPES, DEFAULT_PROPS } from '../proptypes';

class MonthDayPicker extends Component {
  formatValue = ({ month, day }, format) => {
    const rule = format || this.props.format;
    return convert({ month, day }, rule);
  };

  render() {
    return (
      <Picker
        {...this.props}
        tempMode={enumObj.MONTH_DAY_MODEL}
        height={259}
        formatValue={this.formatValue}
      />
    );
  }
}

MonthDayPicker.propTypes = {
  ...PROPTYPES,
  format: PropTypes.string,
  placeholder: PropTypes.string,
};

MonthDayPicker.defaultProps = {
  ...DEFAULT_PROPS,
  format: 'MM/DD',
  placeholder: 'mm/dd',
};

export default MonthDayPicker;
