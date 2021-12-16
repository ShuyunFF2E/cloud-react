/* eslint-disable no-param-reassign */
import moment from 'moment';

export const STR = 'String';
export const OBJ = 'Date';

export const transformString2Moment = (str, format, _this) => {
  if (str instanceof Array) {
    return str.map((v) => transformString2Moment(v, format, _this));
  }
  if (str instanceof Date) {
    if (_this) {
      _this.formatType = OBJ;
    }
    return moment(str);
  }
  if (str instanceof Object) {
    return [
      transformString2Moment(str.start, format, _this),
      transformString2Moment(str.end, format, _this),
    ];
  }
  if (str) {
    if (_this) {
      _this.formatType = STR;
    }
    return moment(str, format);
  }
  return str;
};
