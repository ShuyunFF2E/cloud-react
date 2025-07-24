---
order: 2
title: 部分匹配
desc: 默认的部分匹配模式，会高亮所有匹配的字符
---

```jsx
/**
 * title: 部分匹配
 * desc: 默认的部分匹配模式，会高亮所有匹配的字符
 */
import React from 'react';
import { LightText } from 'cloud-react';

class PartialMatchDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>部分匹配模式（默认）：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
              isFullMatch={false}
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>高亮单个字符 "系"：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="系"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>高亮多个字符 "系统"：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="系统"
            />
          </p>
        </div>
        
        <div>
          <h5>高亮不存在的关键词：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="不存在"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default PartialMatchDemo;
``` 