import moment from 'moment';

function toArray(list) {
  if (!list) {
    return [];
  }
  return Array.isArray(list) ? list : [list];
}

// eslint-disable-next-line import/prefer-default-export
export function getTimeProps(props) {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } =
    props;
  const firstFormat = toArray(format)[0];
  const showTimeObj = { ...props };

  if (firstFormat && typeof firstFormat === 'string') {
    if (!firstFormat.includes('s') && showSecond === undefined) {
      showTimeObj.showSecond = false;
    }
    if (!firstFormat.includes('m') && showMinute === undefined) {
      showTimeObj.showMinute = false;
    }
    if (
      !firstFormat.includes('H') &&
      !firstFormat.includes('h') &&
      showHour === undefined
    ) {
      showTimeObj.showHour = false;
    }

    if (
      (firstFormat.includes('a') || firstFormat.includes('A')) &&
      use12Hours === undefined
    ) {
      showTimeObj.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return showTimeObj;
  }

  if (typeof firstFormat === 'function') {
    // format of showTime should use default when format is custom format function
    delete showTimeObj.format;
  }

  return {
    showTime: showTimeObj,
  };
}

export function transformValue2Moment(val, format) {
  if (typeof val === 'string') {
    return moment(val, format);
  }
  if (val instanceof Date) {
    return moment(val).clone();
  }
  return val;
}
