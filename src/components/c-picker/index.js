import DatePicker from './pickers/date';
import TimePicker from './pickers/time';
import YearPicker from './pickers/year';
import MonthPicker from './pickers/month';
import WeekPicker from './pickers/week';
import QuarterPicker from './pickers/quarter';
import DateRangePicker from './pickers/date-range';
import TimeRangePicker from './pickers/time-range';
import './index.less';

const CPicker = DatePicker;

CPicker.TimePicker = TimePicker;
CPicker.YearPicker = YearPicker;
CPicker.MonthPicker = MonthPicker;
CPicker.WeekPicker = WeekPicker;
CPicker.QuarterPicker = QuarterPicker;
CPicker.RangePicker = DateRangePicker;
CPicker.TimeRangePicker = TimeRangePicker;

export default CPicker;
