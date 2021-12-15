import DatePicker from './pickers/date';
import TimePicker from './pickers/time';
import DateRangePicker from './pickers/date-range';
import TimeRangePicker from './pickers/time-range';
import './index.less';

const CPicker = DatePicker;

CPicker.TimePicker = TimePicker;
CPicker.RangePicker = DateRangePicker;
CPicker.TimeRangePicker = TimeRangePicker;

export default CPicker;