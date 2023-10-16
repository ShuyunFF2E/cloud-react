---
order: 1
title: 徽标
desc: 支持 message、number、dot 三种展示形式
---

```jsx
/**
 * title: 徽标
 * desc: 支持 message、number、dot 三种展示形式
 */
import React from 'react';
import { Badge } from 'cloud-react';

class BadgeDemos extends React.Component {
  onClick = () => {
    console.log('lalala');
  };

  render() {
    const { onClick } = this;
    return (
      <React.Fragment>
        <h4 style={{ marginTop: 0 }}>message 模式</h4>
        <div style={{ display: 'flex', gap: 20 }}>
          <Badge onClick={onClick} />
          <Badge mode="message" type="success" />
          <Badge mode="message" type="warn" />
          <Badge mode="message" type="fail" />
          <Badge mode="message" type="finish" />
        </div>

        <h4>number 模式</h4>
        <div style={{ display: 'flex', gap: 20 }}>
          <Badge mode="number" onClick={onClick} />
          <Badge mode="number" type="success" number={6} />
          <Badge mode="number" type="warn" number={66} />
          <Badge mode="number" type="fail" number={666} />
          <Badge mode="number" type="finish" number={666} />
        </div>

        <h4>dot 模式</h4>
        <div style={{ display: 'flex', gap: 20 }}>
          <Badge mode="dot" text="default" onClick={onClick} />
          <Badge mode="dot" type="success" text="success" />
          <Badge mode="dot" type="warn" text="warn" />
          <Badge mode="dot" type="fail" text="fail" />
          <Badge mode="dot" type="finish" text="finish" />
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeDemos;
```
