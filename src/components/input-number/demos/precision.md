---
order: 4
title: 小数
desc: 和原生的数字输入框一样，value 的精度由 step 的小数位数决定。
---

```jsx
/**
 * title: 小数
 * desc: 和原生的数字输入框一样，value 的精度由 step 的小数位数决定。
 */
import React from "react";
import { Button, InputNumber } from "cloud-react";

const blank = "\u00A0";

class InputNumberDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <InputNumber
            defaultValue={30}
            step={0.01}
            min={1}
            max={10}
            precision={2}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default InputNumberDemo;
```
