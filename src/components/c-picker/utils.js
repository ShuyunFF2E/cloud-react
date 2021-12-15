import moment from 'moment';

export const transformString2Moment = (str, format) => {
  if (str instanceof Array) {
    return str.map((v) => transformString2Moment(v, format));
  }
  if (str instanceof Object) {
    return [
      transformString2Moment(str.start, format),
      transformString2Moment(str.end, format),
    ];
  }
  if (str) {
    return moment(str, format);
  }
  return str;
};
