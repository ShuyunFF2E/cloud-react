---
order: 5
title: 特殊字符处理
desc: 组件会自动转义特殊字符，支持正则表达式中的特殊字符
---

```jsx
/**
 * title: 特殊字符处理
 * desc: 组件会自动转义特殊字符，支持正则表达式中的特殊字符
 */
import React from 'react';
import { LightText } from 'cloud-react';

class SpecialCharsDemo extends React.Component {
  render() {
    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>包含问号的文本：</h5>
          <p>
            <LightText
              originText="这是一个问题？还是一个问题？"
              keyWords="问题？"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>包含括号的文本：</h5>
          <p>
            <LightText
              originText="函数调用 (test) 和 (demo)"
              keyWords="(test)"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>包含加号的文本：</h5>
          <p>
            <LightText
              originText="1+1=2, 2+2=4"
              keyWords="+1"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>包含方括号的文本：</h5>
          <p>
            <LightText
              originText="数组 [1,2,3] 和 [4,5,6]"
              keyWords="[1,2,3]"
            />
          </p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <h5>包含点的文本：</h5>
          <p>
            <LightText
              originText="版本号 1.2.3 和 4.5.6"
              keyWords="1.2"
            />
          </p>
        </div>
        
        <div>
          <h5>包含反斜杠的文本：</h5>
          <p>
            <LightText
              originText="路径 C:\\Users\\test 和 D:\\data"
              keyWords="\\Users"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default SpecialCharsDemo;
``` 