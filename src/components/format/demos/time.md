---
order: 3
title: 时间格式化
desc: 时间格式化模板，支持自定义时间格式
---

```jsx
/**
 * title: 时间格式化
 * desc: 时间格式化模板，支持自定义时间格式
 */
import React from 'react';
import { Format } from 'cloud-react';

class TimeDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>基础时间格式化：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value="2023/12/25" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义格式 - YYYY-MM-DD：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value="2023-12-25" format="YYYY-MM-DD" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义格式 - YYYY年MM月DD日：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value="2023-12-25" format="YYYY年MM月DD日" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义格式 - YYYY-MM-DD HH:mm:ss：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value="2023-12-25 14:30:00" format="YYYY-MM-DD HH:mm:ss" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义格式 - MM/DD/YYYY：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value="2023-12-25" format="MM/DD/YYYY" />
          </div>
        </div>
        
        <div>
          <h5>空值处理：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TimeTpl value={null} />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeDemo;
``` 