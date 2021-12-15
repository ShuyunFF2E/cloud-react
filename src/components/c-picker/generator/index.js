import generateSinglePicker from './single';
import generateRangePicker from './range';

function generatePicker(generateConfig) {
  // =========================== Pickers ===========================
  const {
    DatePicker,
    TimePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    QuarterPicker,
  } = generateSinglePicker(generateConfig);

  // ======================== Range Picker ========================
  const { DateRangePicker, TimeRangePicker } =
    generateRangePicker(generateConfig);

  return {
    DatePicker,
    TimePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    QuarterPicker,
    DateRangePicker,
    TimeRangePicker,
  };
}

export default generatePicker;
