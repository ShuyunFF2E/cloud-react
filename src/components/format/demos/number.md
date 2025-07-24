---
order: 1
title: 数字格式化
desc: 数字格式化模板，支持千分位、小数位数、前缀后缀
---

```jsx
/**
 * title: 数字格式化
 * desc: 数字格式化模板，支持千分位、小数位数、前缀后缀
 */
import React from 'react';
import { Format } from 'cloud-react';

class NumberDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>基础数字格式化：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={1234567} />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>带小数位数：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={1234.5678} precision={2} />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>带前缀后缀：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={1234567} prefix="¥" suffix="元" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>不使用千分位：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={1234567} isThousands={false} />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>百分比格式：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={0.1234} precision={2} suffix="%" />
          </div>
        </div>
        
        <div>
          <h5>空值处理：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.NumberTpl value={null} />
          </div>
        </div>
      </div>
    );
  }
}

export default NumberDemo;
``` 