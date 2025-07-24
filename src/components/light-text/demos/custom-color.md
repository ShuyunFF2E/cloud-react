---
order: 4
title: 自定义颜色
desc: 自定义高亮文本的颜色
---

```jsx
/**
 * title: 自定义颜色
 * desc: 自定义高亮文本的颜色
 */
import React from 'react';
import { LightText } from 'cloud-react';

class CustomColorDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>默认颜色（蓝色）：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>红色高亮：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
              color="#ff4d4f"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>绿色高亮：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
              color="#52c41a"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>橙色高亮：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
              color="#faad14"
            />
          </p>
        </div>
        
        <div>
          <h5>紫色高亮：</h5>
          <p>
            <LightText
              originText="用户管理系统、产品管理系统、订单管理系统"
              keyWords="管理"
              color="#722ed1"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default CustomColorDemo;
``` 