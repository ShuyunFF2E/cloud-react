---
order: 1
title: 日期选择器（新）
desc: 基本用法，日期选择器。
---

```jsx
/**
 * title: 日期选择器
 * desc: 基本用法，日期选择器。
 */
import React from "react";
import moment from "moment";
import { CPicker as DatePicker, Form, Field, Toggle } from "cloud-react";

const { RangePicker, TimeRangePicker } = DatePicker;

const dateRangePresets = [
  {
    label: "近三天",
    value: () => [moment().clone().subtract(2, "days"), moment().clone()],
  },
  {
    label: "近一周",
    value: () => [moment().clone().subtract(6, "days"), moment().clone()],
  },
  {
    label: "近一月",
    value: () => [
      moment().clone().subtract(1, "months").toDate(),
      moment().clone().toDate(),
    ],
  },
  {
    label: "近一年",
    value: () => [moment().clone().subtract(1, "years"), moment().clone()],
  },
];

const timeRangePresets = [
  {
    label: "上午",
    value: () => [
      moment().clone().startOf("day"),
      moment().clone().startOf("day").add(12, "hours"),
    ],
  },
];

class RangePickerDemo extends React.Component {
  field = new Field(this);
  state = {
    values: {
      start: moment("2022/8/10 16:05:33", "yyyy/MM/DD HH:mm:ss").toDate(),
      end: moment("2022/8/12 08:37:21", "yyyy/MM/DD HH:mm:ss").toDate(),
    },
    times: { start: "09:00:00", end: "17:58:58" },
  };

  onChange = (values) => {
    console.log("values:", values);
    this.setState({ values });
  };

  onTimeChange = (times) => {
    console.log("times:", times);
    this.setState({ times });
  };

  render() {
    const { values, times, disabled } = this.state;
    const { init } = this.field;
    return (
      <Form
        field={this.field}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 10 }}
      >
        <Form.Item label="是否可用">
          <Toggle
            checked={!disabled}
            onChange={(b) => this.setState({ disabled: !b })}
          />
        </Form.Item>

        <Form.Item label="日期范围选择器">
          <RangePicker
            value={values}
            onChange={this.onChange}
            disabled={disabled}
            minDate={new Date()}
            presets={dateRangePresets}
          />
        </Form.Item>

        <Form.Item label="日期范围选择器（可清除）">
          <RangePicker
            {...init("date", {
              rules: [
                {
                  required: true,
                  message: "请输入时间",
                },
              ],
              onChange: (v) => {
                console.log(v);
              },
            })}
            allowClear
            showToday
            presets={dateRangePresets}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item label="日期范围选择器（带时间，固定开始日期）">
          <RangePicker
            value={values}
            onChange={this.onChange}
            showTimePicker
            showToday
            showNow
            minDate="2022/01/01 00:00:00"
            defaultTime={["08:00:00", "23:00:00"]}
            disabled={[true, false]}
            allowEmpty={[true, false]}
          />
        </Form.Item>

        <Form.Item label="日期范围选择器（固定结束日期）">
          <RangePicker
            value={values}
            onChange={this.onChange}
            allowClear
            disabled={[false, true]}
            allowEmpty={[true, false]}
          />
        </Form.Item>

        <Form.Item label="日期范围选择器（开始结束可为空）">
          <RangePicker
            allowEmpty={[true, true]}
            presets={dateRangePresets}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item label="时间范围选择器">
          <TimeRangePicker
            value={times}
            onChange={this.onTimeChange}
            showNow
            disabled={disabled}
            presets={timeRangePresets}
          />
        </Form.Item>

        <Form.Item label="时间范围选择器（不显示秒）">
          <TimeRangePicker
            value={times}
            onChange={this.onTimeChange}
            showNow
            format="HH:mm"
            showSecond={false}
            disabled={disabled}
            presets={timeRangePresets}
          />
        </Form.Item>

        <h4>自定义</h4>

        <RangePicker
          placeholder={["开始时间", "结束时间"]}
          style={{ width: 380 }}
          showTimePicker
          format={"yyyy年MM月DD日 HH:mm"}
          onChange={this.onChange}
          minYear={2020}
          maxYear={2030}
          presets={dateRangePresets}
        />
      </Form>
    );
  }
}
export default RangePickerDemo;
```
