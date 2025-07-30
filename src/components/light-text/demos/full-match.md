---
order: 3
title: 完全匹配
desc: 完全匹配模式，只有文本完全等于关键词时才会高亮
---

```jsx
/**
 * title: 完全匹配
 * desc: 完全匹配模式，只有文本完全等于关键词时才会高亮
 */
import React from "react";
import { LightText } from "cloud-react";

class FullMatchDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>完全匹配模式：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="用户管理系统"
              isFullMatch={true}
            />
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>部分匹配（对比）：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="用户管理系统"
              isFullMatch={false}
            />
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>完全匹配单个词：</h5>
          <p>
            <LightText
              originText="用户 管理 系统"
              keyWords="管理"
              isFullMatch={true}
            />
          </p>
        </div>

        <div>
          <h5>完全匹配不存在的词：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="完全不存在"
              isFullMatch={true}
            />
          </p>
        </div>
      </div>
    );
  }
}

export default FullMatchDemo;
```
