---
order: 5
title: 区间选择器
desc: 基本用法。
---

```jsx
/**
 * title: 区间选择器
 * desc: 基本用法。
 */
import React from "react";
import { Datepicker, Button } from "cloud-react";

class DatepickerDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      range1: { start: "2020/04/23", end: "2020/06/07" },
      range2: { start: "2020/04/20 00:00:00", end: "2020/06/20 23:59:59" },
    };
  }

  onInpChange1 = (range1) => {
    this.setState({ range1 });
    console.log(range1, "不可编辑区间");
  };

  onInpChange2 = (range2) => {
    this.setState({ range2 });
    console.log(range2, "可编辑区间");
  };

  reset = () => {
    this.setState({
      range2: { start: "2020/04/20 00:00:00", end: "2020/06/20 23:59:59" },
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <p style={{ marginBottom: 10, marginTop: 20 }}>不可编辑：</p>
          <Datepicker.RangePicker
            position="auto"
            value={this.state.range1}
            onChange={this.onInpChange1}
            isAppendToBody
          />
        </div>
        <div>
          <p style={{ marginBottom: 10, marginTop: 20 }}>可编辑：</p>
          <Datepicker.RangePicker
            position="auto"
            value={this.state.range2}
            onChange={this.onInpChange2}
            isAppendToBody
            showTimePicker
            canEdit
          />
          <Button style={{ marginTop: 20 }} onClick={this.reset}>
            {" "}
            重置{" "}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
export default DatepickerDemo;
```
