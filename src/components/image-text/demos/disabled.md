---
order: 3
title: 禁用状态
desc: 禁用状态下的图文组合展示
---

```jsx
/**
 * title: 禁用状态
 * desc: 禁用状态下的图文组合展示
 */
import React from "react";
import { ImageText } from "cloud-react";

class DisabledDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 300 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>正常状态</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="正常状态"
            desc="这是正常状态的展示"
          />
        </div>
        <div>
          <h5>禁用状态</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="禁用状态"
            desc="这是禁用状态的展示"
            disabled
          />
        </div>
      </div>
    );
  }
}

export default DisabledDemo;
```
