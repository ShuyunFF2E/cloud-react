---
order: 2
title: 文本格式化
desc: 文本格式化模板，支持多行显示、Tooltip提示
---

```jsx
/**
 * title: 文本格式化
 * desc: 文本格式化模板，支持多行显示、Tooltip提示
 */
import React from 'react';
import { Format } from 'cloud-react';

class TextDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>基础文本格式化：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TextTpl value="这是一段普通的文本内容" />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>单行显示（默认）：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px', width: '200px' }}>
            <Format.TextTpl value="这是一段很长的文本内容，可能会超出容器宽度，此时会显示省略号" line={1} />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>多行显示：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px', width: '200px' }}>
            <Format.TextTpl value="这是一段很长的文本内容，可能会超出容器宽度，此时会显示省略号" line={2} />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>自定义Tooltip内容：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px', width: '200px' }}>
            <Format.TextTpl 
              value="这是一段很长的文本内容，可能会超出容器宽度，此时会显示省略号" 
              line={1}
              tooltipValue="这是自定义的Tooltip提示内容"
            />
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>数字类型：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TextTpl value={12345} />
          </div>
        </div>
        
        <div>
          <h5>空值处理：</h5>
          <div style={{ padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
            <Format.TextTpl value={null} />
          </div>
        </div>
      </div>
    );
  }
}

export default TextDemo;
``` 