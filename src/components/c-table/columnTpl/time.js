import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isVoid } from '../util';

export default function TimeTpl({ value, format }) {
  const [time, setTime] = useState(value);

  useEffect(() => {
    if (isVoid(value)) {
      setTime('');
    } else if (format) {
      setTime(moment(value).format(format));
    } else {
      setTime(`${value}`.replaceAll('/', '-'));
    }
  }, [value, format]);

  return time || '-';
}

TimeTpl.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
};

TimeTpl.defaultProps = {
  format: '',
};
