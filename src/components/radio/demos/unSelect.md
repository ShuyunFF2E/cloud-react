---
order: 1 title: Radio desc: 单选按钮
---

```jsx
/**
 * title: Radio
 * desc: 单选按钮
 */
import React, { useState } from "react";
import { ComplexRadio, Radio } from "cloud-react";

function RadioDemo() {
  const [checked, setChecked] = useState(false);
  const [checkedValue, setCheckedValue] = useState(1);

  return (
    <div>
      <h5>单个 Radio 可反选</h5>
      <div style={{ marginBottom: 10 }}>
        <Radio
          supportUnSelect
          value={1}
          checked={checked}
          onChange={(v) => {
            setChecked(!checked);
          }}
        >
          简单 radio
        </Radio>
      </div>
      <div>
        <ComplexRadio
          supportUnSelect
          checked={checked}
          onChange={(v) => {
            setChecked(!checked);
          }}
          titleStyle={{ minWidth: "fit-content" }}
          title="复杂 radio"
          content="说明文案"
          value="A"
        />
      </div>

      <h5>RadioGroup 可反选（当前已选值：{checkedValue}）</h5>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group
          supportUnSelect
          value={checkedValue}
          horizontal
          onChange={(v) => {
            if (v && v === checkedValue) {
              setCheckedValue(null);
            } else {
              setCheckedValue(v);
            }
          }}
        >
          <Radio value={1}>选项A</Radio>
          <Radio value={2}>选项B</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}

export default RadioDemo;
```
