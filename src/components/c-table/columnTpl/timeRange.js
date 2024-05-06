import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function TimeRangeTpl({
  row,
  startKey,
  endKey,
  format,
  startValue,
  endValue,
}) {
  const start = startValue || row?.[startKey];
  const end = endValue || row?.[endKey];
  if (!start && !end) {
    return '-';
  }
  if (format) {
    return (
      <div>
        <p>
          起：
          {start ? moment(start).format(format) : '-'}
        </p>
        <p>
          止：
          {end ? moment(end).format(format) : '-'}
        </p>
      </div>
    );
  }
  return (
    <div>
      <p>
        起：
        {start ? start.replaceAll('/', '-') : '-'}
      </p>
      <p>
        止：
        {end ? end.replaceAll('/', '-') : '-'}
      </p>
    </div>
  );
}

TimeRangeTpl.propTypes = {
  row: PropTypes.object.isRequired,
  startKey: PropTypes.string.isRequired,
  endKey: PropTypes.string.isRequired,
  format: PropTypes.string,
  startValue: PropTypes.string,
  endValue: PropTypes.string,
};

TimeRangeTpl.defaultProps = {
  format: '',
  startValue: '',
  endValue: '',
};
