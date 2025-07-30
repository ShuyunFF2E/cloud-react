---
order: 5
title: 块级按钮
desc: block 属性将使按钮适合其父宽度
---

```jsx
/**
 * title: 块级按钮
 * desc: block 属性将使按钮适合其父宽度
 */
import React from "react";
import { Button } from "cloud-react";

const blank = "\u00A0";

class ButtonDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Button block type="primary">
            主要
          </Button>
          {blank}
          <Button block type="normal">
            描边
          </Button>
          {blank}
          <Button block type="secondary">
            次要
          </Button>
          {blank}
          <Button block type="dashed">
            幽灵
          </Button>
          {blank}
          <Button block type="link">
            链接
          </Button>
          {blank}
          <Button block type="text">
            文字
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default ButtonDemo;
```
