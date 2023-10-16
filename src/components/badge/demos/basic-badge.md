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

function TextBox() {
  return <div style={{ width: 40, height: 40, borderRadius: 6, background: '#e8e8e8' }}/>
}

const commonStyle = {
  position: 'absolute',
  right: -22,
  top: -6
};

class BadgeDemos extends React.Component {
  colorList = ['#FB2D2D', '#FF8000', '#FFBB00', '#13D841', '#28C1E0', '#3380FD', '#FA17F9', '#078DA8', '#0055CC', '#BA25B6'];

  onClick = () => {
    console.log('lalala');
  };

  render() {
    const { onClick } = this;
    return (
      <React.Fragment>
        <h4 style={{ marginTop: 0 }}>message 模式</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Badge onClick={onClick} />
          <Badge mode="message" type="success" />
          <Badge mode="message" type="warn" />
          <Badge mode="message" type="fail" />
          <Badge mode="message" type="finish" />
          <div style={{ position: 'relative' }}>
            <TextBox/>
            <Badge mode="dot" type="fail" text="" style={{
              position: 'absolute',
              right: -9,
              top: -2
            }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ fontSize: 14 }}>文字内容</span>
            <Badge mode="dot" type="fail" text="" style={{
              position: 'absolute',
              right: -12,
              top: -1
            }} />
          </div>
        </div>

        <h4>number 模式</h4>
        <div style={{ display: 'flex', gap: 40 }}>
          <Badge mode="number" onClick={onClick} />
          <Badge mode="number" type="success" number={6} />
          <Badge mode="number" type="warn" number={66} />
          <Badge mode="number" type="fail" number={666} />
          <Badge mode="number" type="finish" number={666} />
        </div>

        <h4>文本样式</h4>
        <div style={{ display: 'flex', gap: 60 }}>
          <div style={{ position: 'relative' }}>
            <TextBox/>
            <Badge mode="number" type="fail" number="NEW" style={commonStyle} />
          </div>
          <div style={{ position: 'relative' }}>
            <TextBox/>
            <Badge mode="number" type="fail" isSquare number="NEW" style={commonStyle} />
          </div>
        </div>

        <h4>dot 模式</h4>
        <div style={{ display: 'flex', gap: 40 }}>
          <Badge mode="dot" type="finish" text="已完成" />
          <Badge mode="dot" text="进行中" onClick={onClick} />
          <Badge mode="dot" type="success" text="成功" />
          <Badge mode="dot" type="warn" text="提醒" />
          <Badge mode="dot" type="fail" text="失败" />
        </div>

        <h4>自定义色值</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: "20px 46px" }}>
          {this.colorList.map((color, index) => (
            <Badge key={index} mode="custom-dot" text={color} color={color} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeDemos;
```
