---
order: 2
title: 带描述文本
desc: 展示图片、标题和描述信息
---

```jsx
/**
 * title: 带描述文本
 * desc: 展示图片、标题和描述信息
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
          label="用户信息"
          desc="用户角色：管理员"
        />
      </div>
    );
  }
}

export default WithDescDemo;
```
