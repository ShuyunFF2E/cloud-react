---
order: 2
title: 结合 Format 组件使用
desc: 结合 Format 组件使用
---

```jsx
/**
 * title: 结合 Format 组件使用
 * desc: 结合 Format 组件使用，超长展示 Tooltip 气泡
 */
import React from "react";
import { ImageText, Format } from "cloud-react";

class WithDescDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 300 }}>
        <ImageText
          imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
          label="产品名称"
          desc={
            <Format.TextTpl value="这是产品的详细描述信息，可以包含多个字符" />
          }
        />
        <br />
        <ImageText
          imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
          label={
            <Format.TextTpl
              value="这是产品的详细描述信息，可以包含多个字符，这是产品的详细描述信息，可以包含多个字符"
              line={2}
            />
          }
        />
      </div>
    );
  }
}

export default WithDescDemo;
```
