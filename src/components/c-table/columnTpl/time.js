import PropTypes from 'prop-types';
import moment from 'moment';
import { isVoid } from '../util';

export default function TimeTpl({ value, format }) {
  if (isVoid(value)) {
    return '-';
  }
  if (format) {
    return moment(value).format(format);
  }
  return `${value}`.replaceAll('/', '-');
}

TimeTpl.propTypes = {
  value: PropTypes.string.isRequired,
  format: PropTypes.string,
};

TimeTpl.defaultProps = {
  format: '',
};
