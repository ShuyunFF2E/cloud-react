import moment from 'moment';
import DatePicker from './pickers/date';
import TimePicker from './pickers/time';
import YearPicker from './pickers/year';
import MonthPicker from './pickers/month';
import WeekPicker from './pickers/week';
import DateRangePicker from './pickers/date-range';
import TimeRangePicker from './pickers/time-range';
import './index.less';

moment.locale('zh_CN');

const CPicker = DatePicker;

CPicker.TimePicker = TimePicker;
CPicker.YearPicker = YearPicker;
CPicker.MonthPicker = MonthPicker;
CPicker.WeekPicker = WeekPicker;
CPicker.RangePicker = DateRangePicker;
CPicker.TimeRangePicker = TimeRangePicker;

export default CPicker;
