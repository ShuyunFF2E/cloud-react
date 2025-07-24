---
order: 5
title: 自定义图片样式
desc: 自定义图片的大小和样式
---

```jsx
/**
 * title: 自定义图片样式
 * desc: 自定义图片的大小和样式
 */
import React from 'react';
import { ImageText } from 'cloud-react';

class CustomImgDemo extends React.Component {
  render() {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <h5>默认尺寸 (48x48)</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="默认尺寸图片"
            desc="48x48像素的图片"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>小尺寸 (32x32)</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="小尺寸图片"
            desc="32x32像素的图片"
            imgStyle={{ width: 32, height: 32 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>大尺寸 (64x64)</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="大尺寸图片"
            desc="64x64像素的图片"
            imgStyle={{ width: 64, height: 64 }}
          />
        </div>

        <div>
          <h5>圆角图片</h5>
          <ImageText
            imgSrc="https://avatars.githubusercontent.com/u/34151318?v=4"
            label="圆角图片"
            desc="设置圆角的图片"
            imgStyle={{ borderRadius: 8 }}
          />
        </div>
      </div>
    );
  }
}

export default CustomImgDemo;
```
