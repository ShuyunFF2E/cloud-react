---
order: 7
title: 时间选择器
desc: 基本用法，时间选择器。
---

```jsx
/**
 * title: 时间选择器
 * desc: 基本用法，时间选择器。
 */
import React from "react";
import { Datepicker, Button } from "cloud-react";

class DatepickerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "22:12:56",
    };
  }

  handleChange = (value) => {
    console.log(value);
  };

  onChange = (value) => {
    console.log(value);
    this.setState({
      value: value.hour + ":" + value.minute + ":" + value.second,
    });
  };

  setValue = () => {
    this.setState({
      value: "20:00:00",
    });
  };

  render() {
    return (
      <div>
        <Datepicker.TimePicker onChange={this.handleChange} />
        <br />
        <br />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Datepicker.TimePicker
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button onClick={this.setValue}>设置时间</Button>
        </div>
      </div>
    );
  }
}
export default DatepickerDemo;
```
