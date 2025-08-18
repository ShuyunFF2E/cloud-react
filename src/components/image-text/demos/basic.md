---
order: 1
title: 基础使用
desc: 最简单的用法，展示图片和标题
---

```jsx
/**
 * title: 基础使用
 * desc: 最简单的用法，展示图片和标题
 */
import React from "react";
import { ImageText } from "cloud-react";

class BasicDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 300 }}>
        <ImageText
          imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
          label="基础图文展示"
        />
      </div>
    );
  }
}

export default BasicDemo;
```
