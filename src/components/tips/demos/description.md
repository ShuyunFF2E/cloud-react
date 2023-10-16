---
title: 带描述文字的提示
desc:
order: 4
---

```jsx
/**
 * title: 带描述文字的提示
 * desc:
 */

import React from 'react';
import { Tips } from 'cloud-react';

class TipsDemo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tips
          msg="带描述的提示"
          description="这里是描述性文字 这里是描述性文字 这里是描述性文字"
        />

        <Tips
          type="warning"
          isShowIcon
          msg="<div>不仅有描述 还有icon和关闭</div>"
          description="这里是描述性文字 这里是描述性文字 这里是描述性文字"
          closeIcon="close-line"
        />

        <Tips
          type="major"
          isShowIcon
          msg={<div style={{ color: 'red' }}>传个数组试试</div>}
          description={[
            '1.这里是描述性文字',
            '2.这里是描述性文字',
            '3.这里是描述性文字',
          ]}
          closeIcon="close-line"
        />
      </div>
    );
  }
}
export default TipsDemo;
```
