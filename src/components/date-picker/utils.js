import moment from 'moment';

export const transformString2Moment = (str, format) => {
  if (str instanceof Array) {
    return str.map((v) => transformString2Moment(v, format));
  }
  if (str) {
    return moment(str, format);
  }
  return str;
};
