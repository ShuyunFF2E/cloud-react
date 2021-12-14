import Datepicker from './date-picker';
import MonthDayPicker from './month-day';
import TimePicker from './time-picker';
import YearPicker from './year';
import YearMonthPicker from './year-month';
import RangePicker from './date-range';
import './index.less';

Object.assign(Datepicker, {
  TimePicker,
  YearPicker,
  YearMonthPicker,
  MonthDayPicker,
  RangePicker,
});

export default Datepicker;
