import DatePicker from './pickers/date';
import TimePicker from './pickers/time';
import DateRangePicker from './pickers/date-range';
import TimeRangePicker from './pickers/time-range';
import './index.less';

const Picker = DatePicker;

Picker.TimePicker = TimePicker;
Picker.RangePicker = DateRangePicker;
Picker.TimeRangePicker = TimeRangePicker;

export default Picker;
