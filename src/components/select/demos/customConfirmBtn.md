---
order: 13 title: 自定义 confirmBtn 模板 desc: 下拉多选
---

```jsx
/**
 * title: 自定义 confirmBtn 模板
 * desc: 下拉多选
 */
import React, { useState } from "react";
import { Select, Button } from "cloud-react";

const dataList = [
  {
    label: "苹果",
    value: "apple",
  },
  {
    label: "草莓",
    value: "strawberry",
  },
  {
    label: "荔枝",
    value: "litchi",
  },
];

export default function SelectDemo() {
  let selected = [];

  const handleOk = (value) => {
    selected = value;
  };

  const confirmTemplate = ({ onOk }) => (
    <div className="cloud-select-operate-btn">
      <Button
        type="primary"
        size="small"
        className="btn"
        onClick={onOk}
        style={{ width: 92 }}
      >
        自定义确认
      </Button>
    </div>
  );

  return (
    <div style={{ display: "flex", height: 150 }}>
      <div>
        <h5>基础</h5>
        <Select
          placeholder="请选择"
          valueKey="value"
          labelKey="label"
          dataSource={dataList}
          defaultValue={selected}
          onOk={handleOk}
          style={{ margin: "0 10px 10px 0", width: 200 }}
          multiple
          hasConfirmButton
          hasSelectAll
          searchable
          supportLightText
          allowClear
        />
      </div>
      <div>
        <h5>自定义确认按钮</h5>
        <Select
          placeholder="请选择"
          valueKey="value"
          labelKey="label"
          dataSource={dataList}
          defaultValue={selected}
          onOk={handleOk}
          style={{ margin: "0 10px 10px 0", width: 200 }}
          multiple
          hasConfirmButton
          hasSelectAll
          confirmTemplate={confirmTemplate}
          allowClear
        />
      </div>
    </div>
  );
}
```
