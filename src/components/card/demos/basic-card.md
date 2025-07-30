---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx
/**
 * title: 典型卡片
 * desc: 包含标题、内容、操作区域
 */
import React from "react";
import { Card, Avatar, Button } from "cloud-react";

class CardDemos extends React.Component {
  actionOne = (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Button type="link">创建活动</Button>
      <Button type="link">创建活动</Button>
    </div>
  );
  render() {
    return (
      <div
        style={{ background: "#F2F2F2", padding: 30, display: "flex", gap: 30 }}
      >
        <Card>
          <p>这里是内容</p>
          <p>这里是内容</p>
        </Card>
        <Card title="标题" extra="更多操作">
          <p>这里是内容</p>
          <p>这里是内容</p>
        </Card>
        <Card title="标题" extra="更多操作" action={this.actionOne}>
          <p>这里是内容</p>
          <p>这里是内容</p>
        </Card>
      </div>
    );
  }
}
export default CardDemos;
```
