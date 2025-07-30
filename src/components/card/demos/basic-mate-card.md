---
order: 1
title: 面包屑
desc: 可切换大小的面包屑
---

```jsx
/**
 * title: 基础Card Mate
 * desc: 包含标题、内容、头像
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
        <Card
          cover={
            <img src="https://brand-guide.shuyun.com/IAM/0c2841aceba9.jpeg" />
          }
          action={this.actionOne}
        >
          <Card.Mate
            title={<p>标题</p>}
            description={
              <div>
                这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
              </div>
            }
            avatar={
              <Avatar
                src="https://brand-guide.shuyun.com/IAM/0a06d4f03b56.png"
                size="large"
              />
            }
          />
        </Card>
      </div>
    );
  }
}
export default CardDemos;
```
