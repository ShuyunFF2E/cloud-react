import Datepicker from './date-picker';
import MonthDayPicker from './month-day/index';
import RangePicker from './range-picker';
import TimePicker from './time-picker';
import YearPicker from './year';
import YearMonthPicker from './year-month';
import './index.less';

Object.assign(Datepicker, {
	RangePicker,
	TimePicker,
	YearPicker,
	YearMonthPicker,
	MonthDayPicker
});

export default Datepicker;
