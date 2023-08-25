import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isVoid } from '../util';

export default function TimeRangeTpl({ value, format }) {
  if (isVoid(value)) {
    return '-';
  }
  if (format) {
    return (
      <div>
        <p>
          起：
          {moment(value).format(format)}
        </p>
        <p>
          止：
          {moment(value).format(format)}
        </p>
      </div>
    );
  }
  return `${value}`.replaceAll('/', '-');
}

TimeRangeTpl.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
};

TimeRangeTpl.defaultProps = {
  format: '',
};
