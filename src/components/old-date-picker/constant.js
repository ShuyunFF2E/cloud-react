import { prefixCls } from '@utils';

export const selectorClass = `${prefixCls}-datepicker`;
export const timeSelectorClass = `${prefixCls}-timepicker`;
export const rangeSelectorClass = `${prefixCls}-rangepicker`;
export const containerClass = `${selectorClass}-container`;
export const wrapperClass = `${selectorClass}-wrapper`;
export const disClass = 'grid-disabled';

export const monthArr = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

// popup固定宽度
export const POPUP_WIDTH = 246;

export const enumObj = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',

  YEAR_MODEL: 'YEAR_MODEL',
  YEAR_MONTH_MODEL: 'YEAR_MONTH_MODEL',
  MONTH_MODEL: 'MONTH_MODEL',
  MONTH_DAY_MODEL: 'MONTH_DAY_MODEL',

  DATE_MODEL: 'DATE_MODEL',
  DATE_TIME_MODEL: 'DATE_TIME_MODEL',
};

export const enumCheck = {
  YEAR_MODEL: {
    replaceRule: /[^\d]/g,
    lenRule: 4,
    backslashRule: 0,
  },
  YEAR_MONTH_MODEL: {
    replaceRule: /[^\d/]/g,
    lenRule: 7,
    backslashRule: 1,
  },
  MONTH_DAY_MODEL: {
    replaceRule: /[^\d/]/g,
    lenRule: 5,
    backslashRule: 1,
  },
  DATE_MODEL: {
    replaceRule: /[^\d/]/g,
    lenRule: 10,
    backslashRule: 2,
  },
  DATE_TIME_MODEL: {
    replaceRule: /[^' '\d:/]/g,
    lenRule: 19,
    backslashRule: 2,
  },
};

export const FORMAT = {
  [enumObj.YEAR_MODEL]: 'YYYY',
  [enumObj.YEAR_MONTH_MODEL]: 'YYYY/MM',
  [enumObj.MONTH_DAY_MODEL]: 'MM/DD',
  [enumObj.DATE_MODEL]: 'yyyy/MM/dd',
};

const now = new Date();
const month = now.getMonth() + 1;
const day = now.getDate();

export const currentTime = {
  currentYear: now.getFullYear(),
  currentMonth: month < 10 ? `0${month}` : month,
  currentDate: day < 10 ? `0${day}` : day,
  month,
  day,
  now,
};
