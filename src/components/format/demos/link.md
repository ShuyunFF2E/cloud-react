---
order: 5
title: 链接格式化
desc: 链接格式化模板，支持点击跳转、自定义点击事件
---

```jsx
/**
 * title: 链接格式化
 * desc: 链接格式化模板，支持点击跳转、自定义点击事件
 */
import React from "react";
import { Format } from "cloud-react";

const style = {
  padding: "8px",
  background: "#FAFAFA",
  borderRadius: "4px",
  padding: 12,
};

class LinkDemo extends React.Component {
  handleClick = () => {
    alert("自定义点击事件被触发！");
  };

  render() {
    const mockRow = {
      url: "https://www.example.com",
      detailUrl: "https://www.example.com/detail",
      downloadUrl: "https://www.example.com/download",
    };

    return (
      <div style={{ width: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <h5>基础链接格式化：</h5>
          <div style={style}>
            <Format.LinkTpl value="点击查看详情" row={mockRow} linkKey="url" />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={style}>
            <Format.LinkTpl
              value="查看详细信息"
              row={mockRow}
              linkKey="detailUrl"
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>使用自定义链接：</h5>
          <div style={style}>
            <Format.LinkTpl
              value="下载文件"
              link="https://www.example.com/download"
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>自定义点击事件：</h5>
          <div style={style}>
            <Format.LinkTpl value="点击触发事件" onClick={this.handleClick} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h5>多行显示：</h5>
          <div style={{ ...style, width: 200 }}>
            <Format.LinkTpl
              value="这是一段很长的链接文本，可能会超出容器宽度，此时会显示省略号这是一段很长的链接文本，可能会超出容器宽度，此时会显示省略号"
              row={mockRow}
              linkKey="url"
              line={3}
            />
          </div>
        </div>

        <div>
          <h5>空值处理：</h5>
          <div style={style}>
            <Format.LinkTpl value={null} row={mockRow} linkKey="url" />
          </div>
        </div>
      </div>
    );
  }
}

export default LinkDemo;
```
