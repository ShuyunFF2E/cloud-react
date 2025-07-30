---
order: 1
title: 基础使用
desc: 最基本的文本高亮功能
---

```jsx
/**
 * title: 基础使用
 * desc: 最基本的文本高亮功能
 */
import React from "react";
import { LightText } from "cloud-react";

class BasicDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>原始文本：</h5>
          <p>这是一个产品管理系统，用于管理产品的各种信息。</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>高亮关键词 "产品"：</h5>
          <p>
            <LightText
              originText="这是一个产品管理系统，用于管理产品的各种信息。"
              keyWords="产品"
            />
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>高亮关键词 "管理"：</h5>
          <p>
            <LightText
              originText="这是一个产品管理系统，用于管理产品的各种信息。"
              keyWords="管理"
            />
          </p>
        </div>

        <div>
          <h5>高亮多个字符 "系统"：</h5>
          <p>
            <LightText
              originText="这是一个产品管理系统，用于管理产品的各种信息。"
              keyWords="系统"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default BasicDemo;
```
