import generateSinglePicker from './single';

function generatePicker(generateConfig) {
  // =========================== Pickers ===========================
  const {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
  } = generateSinglePicker(generateConfig);

  // ======================== Range Picker ========================
  // const RangePicker = generateRangePicker(generateConfig);

  const MergedDatePicker = DatePicker;
  MergedDatePicker.WeekPicker = WeekPicker;
  MergedDatePicker.MonthPicker = MonthPicker;
  MergedDatePicker.YearPicker = YearPicker;
  // MergedDatePicker.RangePicker = RangePicker;
  MergedDatePicker.TimePicker = TimePicker;
  MergedDatePicker.QuarterPicker = QuarterPicker;

  return MergedDatePicker;
}

export default generatePicker;
